import {IGridsterOptions} from '../../../components/gridster/IGridsterOptions';

export const gridsterOptions: IGridsterOptions = {
  // core configuration is default one - for smallest view. It has hidden minWidth: 0.
  lanes: 2, // amount of lanes (cells) in the grid
  direction: 'vertical', // floating top - vertical, left - horizontal
  floating: true,
  dragAndDrop: true, // enable/disable drag and drop for all items in grid
  resizable: true, // enable/disable resizing by drag and drop for all items in grid
  resizeHandles: {
    s: true,
    e: true,
    se: true
  },
  widthHeightRatio: 1, // proportion between item width and height
  shrink: true,
  useCSSTransforms: true,
  responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
  responsiveDebounce: 500, // window resize debounce time
  // List of different gridster configurations for different breakpoints.
  // Each breakpoint is defined by name stored in "breakpoint" property. There is fixed set of breakpoints
  // available to use with default minWidth assign to each.
  // - sm: 576 - Small devices
  // - md: 768 - Medium devices
  // - lg: 992 - Large devices
  // - xl: 1200 - Extra large
  // MinWidth for each breakpoint can be overwritten like it's visible below.
  // ResponsiveOptions can overwrite default configuration with any option available.
  responsiveOptions: [
    {
      breakpoint: 'sm',
      // minWidth: 480,
      lanes: 3
    },
    {
      breakpoint: 'md',
      minWidth: 768,
      lanes: 4
    },
    {
      breakpoint: 'lg',
      minWidth: 1250,
      lanes: 6
    },
    {
      breakpoint: 'xl',
      minWidth: 1800,
      lanes: 8
    }
  ]
};
