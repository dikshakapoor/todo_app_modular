const domUtils = function () {
  return {
    closestNode: function (element, dataAttribute) {
      while (element.getAttribute("data-type") !== dataAttribute) {
        element = element.parentNode;
      }
      return element;
    },
    childNode: function (element, dataAttribute) {
      const getChildNode = element.querySelector(`[data-type = ${dataAttribute}]`);
      return getChildNode;
    }
  }
}
export default domUtils;