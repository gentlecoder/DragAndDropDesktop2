export interface IGridsterOptions {
    direction?: string;
    lanes?: number;
    widthHeightRatio?: number;
    heightToFontSizeRatio?: number;
    dragAndDrop?: boolean;
    itemSelector?: string;
    resizable?: boolean;
    resizeHandles?: {
        s?: boolean,
        e?: boolean,
        n?: boolean,
        w?: boolean,
        se?: boolean,
        ne?: boolean,
        sw?: boolean,
        nw?: boolean
    };
    shrink?: boolean;
    floating?: boolean;
    responsiveView?: boolean;
    responsiveDebounce?: number;
    breakpoint?: string;
    minWidth?: number;
    useCSSTransforms?: boolean;
    cellHeight?: number;
    cellWidth?: number;
    tolerance?: string;
    responsiveOptions?: Array<IGridsterOptions>;
}
