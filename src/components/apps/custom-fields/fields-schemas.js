const schemas = {
    number: (data) => {
        return [
            {
                field: "label",
                label: "Field Label",
                type: "text",
                value: data.label || "",
                attributes: {
                    class: {
                        "form-control": true
                    }
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true,
                        "form-group-default": true,
                        required: true
                    }
                },
                validations: {
                    required: true
                }
            }
        ];
    },
    select: (data) => {
        return [
            {
                field: "label",
                label: "Field Label",
                type: "text",
                value: data.label || "",
                attributes: {
                    class: {
                        "form-control": true
                    }
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true,
                        "form-group-default": true,
                        required: true
                    }
                },
                validations: {
                    required: true
                }
            },
            {
                field: "values",
                label: "Field Options",
                type: "textarea",
                value: data.values || "",
                attributes: {
                    class: {
                        "form-control": true
                    },
                    style: {
                        height: "100px"
                    }
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true,
                        "form-group-default": true,
                        required: true
                    }
                },
                validations: {
                    required: true
                }
            },
            {
                field: "default_value",
                label: "Default Option",
                type: "select",
                options: [],
                attributes: {
                    "open-direction": "above",
                    "show-labels": false
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true
                    }
                }
            }
        ]
    },
    text: (data) => {
        return [
            {
                field: "label",
                label: "Field Label",
                type: "text",
                value: data.label || "",
                attributes: {
                    class: {
                        "form-control": true
                    }
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true,
                        "form-group-default": true,
                        required: true
                    }
                },
                validations: {
                    required: true
                }
            },
            {
                field: "attributes:maxlength",
                label: "Max Length",
                type: "number",
                value: data.attributes.maxlength || 255,
                attributes: {
                    class: {
                        "form-control": true
                    }
                },
                wrapperAttributes: {
                    class: {
                        "form-group": true,
                        "form-group-default": true,
                        required: true
                    }
                },
                validations: {
                    required: true,
                    min_value: 1,
                    max_value: 255
                }
            }
        ];
    }
};

export default function(type, data) {
    return schemas[type](data);
}
