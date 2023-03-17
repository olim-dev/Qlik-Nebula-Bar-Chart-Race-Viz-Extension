/* eslint-disable */
import {
  useElement,
  useLayout,
  useEffect,
  useState,
} from "@nebula.js/stardust";
import properties from "./object-properties";
import data from "./data";
import viz from "./viz";

export default function supernova() {
  return {
    qae: {
      properties,
      data,
    },
    component() {
      const element = useElement();
      const layout = useLayout();

      const [replay, setReplay] = useState(false);

      const onReplay = () => {
        setReplay((prevState) => !prevState);
      };

      // Restart Button
      useEffect(() => {
        const replayBtn = document.createElement("button");
        replayBtn.innerText = "Restart";
        replayBtn.onclick = onReplay;
        replayBtn.style.display = "inline-block";
        replayBtn.style.margin = "2px 5px 2px 5px";
        replayBtn.style.cursor = "pointer";
        replayBtn.style.backgroundColor = "#FFFFFF";
        replayBtn.style.padding = "7px 10px";
        replayBtn.style.color = "#000000";
        replayBtn.style.border = "1px solid #000000";

        element.appendChild(replayBtn);
      }, []);

      // UseEffect
      useEffect(() => {
        if (!layout) {
          return;
        }
        const qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

        // Formatted Data Array from layout
        const data = qMatrix.map((d) => ({
          date: d[0].qText,
          name: d[1].qText,
          value: d[2].qNum,
        }));

        // Create viz container
        var id = "container_" + layout.qInfo.qId;
        const elem_new = `<div id=${id}></div>`;
        const vizContainer = document.createElement("div");
        vizContainer.innerHTML = elem_new;
        element.appendChild(vizContainer);

        // Call viz() function
        viz(data, id, replay);
      }, [element, layout, replay]);
    },
  };
}
