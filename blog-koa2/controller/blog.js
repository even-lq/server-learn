const { exec } = require('../db/mysql');
const xss = require('xss');

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  author && (sql += `and author='${author}' `);
  keyword && (sql += `and title like '%${keyword}%' `);
  sql += `order by createtime desc;`

  // 返回 promise
  return await exec(sql);
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id=${id}`;
  const rows = await exec(sql);
  return rows[0];
}

const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData;
  title = xss(title);
  content = xss(content);
  author = xss(author);
  const createTime = Date.now();
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `;

  // async会返回promise
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {

  const { title, content } = blogData;
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `;
  const updateData = await exec(sql);
  return updateData.affectedRows > 0;
}

const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  const deleteData = await exec(sql);
  return deleteData.affectedRows > 0;
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}