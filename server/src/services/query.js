const DEAFULT_PAGE_LIMIT = 0;
const DEAFULT_PAGE_NUMBER = 1;
function getPagination(query) {
const page = Math.abs(query.page)||DEAFULT_PAGE_NUMBER;
const limit=Math.abs(query.limit)||DEAFULT_PAGE_LIMIT;
const skip = (page - 1) * limit;
return{
skip:skip,
limit:limit
}
}

module.exports={
getPagination
}