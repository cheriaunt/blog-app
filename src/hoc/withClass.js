/* eslint-disable react/display-name */
const withClass = (Component, className) =>
  function (props) {
    return (
      <div className={className}>
        <Component {...props} />
      </div>
    )
  }

export default withClass
