import styled, { css } from "styled-components";
import React from "react";

const Comp = styled.svg.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`
  })
})`
  cursor: grab;
  width: 10%;
  height: 10%;
  top: 50%;
  left: 50%;
  border-radius: 3px;
  background-color: red;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;

class DraggableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouveup", this.handleMouseUp);
  }

  handleMouseDown({ clientX, clientY }) {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({ originalX: clientX, originalY: clientY, isDragging: true });
  }

  handleMouseMove({ clientX, clientY }) {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(
      prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      }
    );
  }

  handleMouseUp() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  }

  render() {
    return (
      <Comp
        onMouseDown={this.handleMouseDown}
        x={this.state.translateX}
        y={this.state.translateY}
        isDragging={this.state.isDragging}
      > {this.props.name} </Comp>
    );
  }
}

export default DraggableComp;
