import { unstable_registerShapeComponent, unstable_registerShapeModel, } from "polotno/config";
import { Html } from 'react-konva-utils';
import React from "react";
import { observer } from "mobx-react-lite";
import { StoreType } from "polotno/model/store";
import { Rect } from 'react-konva';
export const ChartElement = observer(({ element, store }: { element: any, store: StoreType }) => {
    console.log("element", element);
    console.log("store", store);
    const { width, height, x, y } = element;

    const handleChange = (e: any) => {
        console.log(e)
        console.log("element", element);
        element.set({
            x: element.x + 10,
            y: element.y + 10,
        })
        store.selectElements([element.id])

    };

    return (
        <React.Fragment>
            <Html>
                <Rect onDragStart={handleChange} onDragMove={handleChange}>
                    <button onClick={handleChange}>Hello</button>
                    <iframe onClick={handleChange} src="http://127.0.0.1:5500/area-stack.html" width={width} height={height}
                        style={{
                            position: "fixed",
                            marginLeft: x,
                            marginTop: y,
                            width: width,
                            height: height,
                        }}
                    ></iframe>
                </Rect>

            </Html>
        </React.Fragment >
    )
});

unstable_registerShapeModel({
    type: "chart",
    defaultWidth: 1000,
    defaultHeight: 500,

});

unstable_registerShapeComponent("chart", ChartElement);
