import { contrastingColor, STATUS_COLOR } from "shared/utils/color";

export function usePaint() {
  function paintElementsByStates(props: {
    modeling: any;
    states: { node_id: string; status: string }[];
    elements: any[];
  }) {
    props.states.forEach((state) => {
      const element = props.elements.find(
        (elem) => elem.id === `Node_${state.node_id}`
      );

      if (element) {
        props.modeling.setColor(element, {
          fill: STATUS_COLOR[state.status],
          stroke: contrastingColor(STATUS_COLOR[state.status]),
        });
      }
    });
  }

  function paintElementsByDefault(props: { modeling: any; elements: any[] }) {
    props.elements.forEach((element) => {
      props.modeling.setColor([element.teste], {
        stroke: element.color.stroke,
        fill: element.color.fill,
      });
    });
  }

  return {
    elementsByStates: paintElementsByStates,
    elementsByDefault: paintElementsByDefault,
  };
}
