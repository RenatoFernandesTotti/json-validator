const flat = require('flat')

class jsonValidator {

    //public properties

    //private properties
    #template = {}
    #lastErrors = []
    #keys = []
    #types = []

    /**
     * 
     * @param {object} JSONTemplate 
     */
    constructor(JSONTemplate) {
        this.#template = flat(JSONTemplate)
        Object.entries(this.#template).forEach(entry => {
            this.#keys.push(entry[0])
            this.#types.push({ [entry[0]]: entry[1] })
        })

    }

    //getters
    get template() {
        return this.#template
    }

    get errors() {
        return this.#lastErrors
    }



    /**
     * 
     * @param {object} object 
     * @param {object} options
     * @param {boolean} options.throwError 
     * @returns {[String]}
     */
    validateJSON(object, options = {
        throwError: false
    }) {

        try {
            this.#lastErrors = []
            object = flat(object)
            this.#types.forEach(type => {

                let entry = Object.entries(type)[0]

                if (object.hasOwnProperty(entry[0])) {
                    if (typeof object[entry[0]] != entry[1] && entry[1]!== 'any') {

                        this.#lastErrors.push(`key ${entry[0]} was not the same type from template (${entry[1]}) it was ${typeof object[entry[0]]}`)
                        return
                    }

                    return
                }

                this.#lastErrors.push(`The property ${entry[0]} was not found in object`)

            })

            if (options.throwError) {
                if (this.#lastErrors.length !== 0) {
                    throw new Error(this.#lastErrors)
                }
            }

            return this.#lastErrors

        } catch (error) {
            throw error
        }


    }

    /**
     * 
     * @param {[object]} array 
     * @param {object} options 
     * @param {boolean} options.throwError 
     * @returns {[String]}
     */
    validateJSONArray(array, options = {
        throwError: false
    }) {
        try {
            let i = 0;
            let errors = []
            let errosIndexJson = []
            let errorMessages=[]
            if (array.length === 0) {
                throw new Error('Array should not be empty')
            }

            array.forEach(json => {
                try {
                    errors = this.validateJSON(json, options)

                    if (errors.length !== 0) {
                        errosIndexJson.push({ [i]: errors })
                    }

                } catch (error) {
                    error.message = error.message.replace("Error:", "");
                    error.message=error.message + ` at position ${i} of the array`
                    errorMessages.push(error.message)
                } finally {
                    i++
                }
            })

            if (options.throwError) {
                throw new Error(errorMessages)
            }

            return errosIndexJson

        } catch (error) {
            throw error
        }
    }
}


module.exports = jsonValidator