### Summary:
This theme file contains the default props and base mock for the Image component. It provides a default set of properties for the Image component, which can be overridden as needed. The file also includes a base mock function that allows for easy customization of the default props.

### Import statements:
The file imports the `ImageProps` type from the `Image.types` file. This type is used to define the structure of the props that the Image component can accept.

### Default Props List:
- `imageDefaultMock`: This is an object that represents the default props for the Image component. It includes properties such as `src`, `alt`, `width`, `height`, `className`, and `testId`. Additionally, it includes a commented out property `lazy` which is set to `false`.
- `imageBaseMock`: This is a function that returns the merged result of the `imageDefaultMock` and any overrides provided as arguments.

### Root Styles:
The file does not contain any explicit root styles. The default props provided in `imageDefaultMock` include properties such as `className` which can be used to apply styles to the Image component.

### Variants:
There are no explicit variants defined in this file. However, the `imageDefaultMock` and `imageBaseMock` provide a way to customize the default props, effectively allowing for variant-like behavior.

### Interaction Summary:
This file primarily serves as a central location for managing the default props of the Image component. It can be used to ensure consistency in the default appearance and behavior of the Image component across the application.

### Developer Questions:
1. How can I override the default props provided in the `imageDefaultMock` object?
2. What is the purpose of the `testId` property in the default props?
3. How can I apply additional styles to the Image component beyond the default props provided in this file?
4. What is the significance of the commented out `lazy` property in the `imageDefaultMock` object?