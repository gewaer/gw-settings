const schemas = {
    number: (data) => {
        return {
            field: data.name,
            label: data.label,
            type: "number",
            value: "",
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
    },
    select: (data) => {
        return {
            field: data.name,
            label: data.label,
            type: "select",
            options: data.values,
            value: null,
            attributes: {
                allowEmpty: false,
                label: "label",
                "show-labels": false,
                "track-by": "value"
            },
            wrapperAttributes: {
                class: {
                    "form-group": true,
                    required: true
                }
            }
        }
    },
    text: (data) => {
        return {
            field: data.name,
            label: data.label,
            type: "text",
            value: "",
            attributes: {
                class: {
                    "form-control": true
                },
                maxlength: 255
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
    }
};

export default function(type, data) {
    return schemas[type](data);
}
