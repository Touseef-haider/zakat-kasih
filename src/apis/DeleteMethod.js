import { deleteMethod } from '../utils/Response'


export const deleteFromSavedZakatCollection = (id) =>{
    var relativeUrl = `/saved-calculations/${id}`
    return deleteMethod(relativeUrl)
}