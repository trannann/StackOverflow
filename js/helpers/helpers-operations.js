export const findItemById = (array, itemId) => {
    var result = -1

    for(let i = 0; i < array.length; i++) {
        if(array[i].id === itemId) {
            result = i;
            break;
        }
    }

    return result;
}