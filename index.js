import React, { Fragment } from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
  };

  passRecursiveStyles = (children, styleProps) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const childProps = { globalStyles: { ...styleProps } };
      childProps.children = this.passRecursiveStyles(child.props.children);
      return React.cloneElement(child, childProps);
    });
  };

  render() {
    const { children, styles } = this.props;
    return <Fragment>{this.passRecursiveStyles(children, styles)}</Fragment>;
  }
}

export default App;
