import {default as tmpl} from './pf-alert.template';

// PfAlert Element
export class PfAlert extends HTMLElement {
  // Called when an instance was inserted into the document
  attachedCallback() {
    this.insertBefore(this._template.content, this.firstChild);
  };

  // Called when element's attribute value has changed
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "type") {
      this._resetType(oldValue, newValue);
      this._initType();
    }
  };

  // Called when an instance of the element is created
  createdCallback() {
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this.classList.add("alert");
    this._initType();
  };

  // Helper function to update type
  _initType() {
    var pficon = this._getElement('.pficon');
    switch (this.getAttribute("type")) {
      case "danger":
        this.classList.add("alert-danger");
        pficon.classList.add("pficon-error-circle-o");
        break;
      case "info":
        this.classList.add("alert-info");
        pficon.classList.add("pficon-info");
        break;
      case "success":
        this.classList.add("alert-success");
        pficon.classList.add("pficon-ok");
        break;
      case "warning":
        this.classList.add("alert-warning");
        pficon.classList.add("pficon-warning-triangle-o");
        break;
    }
  }

  // Helper function to reset type
  _resetType(oldValue) {
    var pficon = this._getElement('.pficon');
    switch (oldValue) {
      case "danger":
        this.classList.remove("alert-danger");
        pficon.classList.remove("pficon-error-circle-o");
        break;
      case "info":
        this.classList.remove("alert-info");
        pficon.classList.remove("pficon-info");
        break;
      case "success":
        this.classList.remove("alert-success");
        pficon.classList.remove("pficon-ok");
        break;
      case "warning":
        this.classList.remove("alert-warning");
        pficon.classList.remove("pficon-warning-triangle-o");
        break;
    }
  }

  // Get pficon from this node or doc fragment
  _getElement(selector) {
    var el = this.querySelector(selector);
    if (el === null) {
      el = this._template.content.querySelector(selector);
    }
    return el;
  }
}
(function() {
  document.registerElement('pf-alert', PfAlert);
}());
