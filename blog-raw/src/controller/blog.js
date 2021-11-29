const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B' ,
      createTime: 1546610524373,
      author: 'lisi' 
    }
  ]
}

const getDetail = (id) => {
  
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog', id, blogData)
  return true
}

const deleteBlog = (id) => {
  console.log('deleteBlog', id)
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}