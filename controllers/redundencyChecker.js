function redundent(text,lists){
    for(x of lists){
        if(text == x){
            return true
        }
    }
    return false
}
module.exports = redundent