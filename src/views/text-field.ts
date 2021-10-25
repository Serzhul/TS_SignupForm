import { nextTick } from "../utils";
import { ValidateRule } from "../types";
import template from "./text-field.template";
import { RequireRule } from "../constant";

type Props = {
  // 입력 받을 데이터 타입 정의
  id: string;
  label: string;
  type: "text" | "email" | "number";
  placeholder?: string;
  text?: string;
  require: boolean;
};

const DefaultProps: Props = {
  // 기본 입력값
  id: "",
  text: "",
  label: "label",
  type: "text",
  placeholder: "",
  require: false,
};

export default class TextField {
  private template = template;
  private container: string;
  private data: Props;
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data }; // 입력 받은 데이터 중 없는 값은 default로, 받은 값은 오버라이드로 업데이트

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : "";

    const invalidateRules = this.validateRules.filter(
      // 정규식을 통해 test 메소드로 실행하여 boolean값을 받아옴
      // 아무런 것도 걸리지 않으면 통과
      (validateRule) => validateRule.rule.test(target) !== validateRule.match
    );

    return invalidateRules.length > 0 ? invalidateRules[0] : null;
  };

  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: !!isInvalid ? isInvalid.message : "",
      };
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: true,
        validateMessage: "",
      };
    }
  };

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;

    if (id === this.data.id) {
      // Text Event가 여러가지 사용됐을 때 Field를 특정하기 위해 id값 비교
      this.updated = true; // 최초 아무것도 안했을 경우와 달리 한번이라도 바뀌었으면 update 상태를 true로 바꿈
      this.data.text = value;
      this.update();
    }
  };

  private attachEventHandler = () => {
    document
      .querySelector(this.container)
      ?.addEventListener("change", this.onChange);
  };

  private update = () => {
    const container = document.querySelector(
      `#field-${this.data.id}`
    ) as HTMLElement;
    const docFrag = document.createElement("div");

    docFrag.innerHTML = this.template(this.buildData());
    container.innerHTML = docFrag.children[0].innerHTML;
  };

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || "";
  }

  public get isValid(): boolean {
    return !this.validate();
  }

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  };

  public render = (append: boolean = false) => {
    // 개별 요소 UI는 innerHTML로 바로 넣는 것이 아니라 append 하는 형태로 추가함
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  };
}
