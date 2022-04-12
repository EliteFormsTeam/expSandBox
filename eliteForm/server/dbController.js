const dbController = {};
import db from '../database/database.js'

// dbController.addUser = (req, res, next) => {
//   const { username, email } = req.body

//   res.locals.username = username;
//   res.locals.email = email;
  
//   const params = [username, email];
//   const saveUserQuery = `
//       INSERT INTO users (first_name, last_name, user_name, email, password)
//       VALUES($1, $2)
//       RETURNING *
//       `;
//   const newUser = db.query(saveUserQuery, params);
//   res.locals.userId = newUser.rows[0].id;
//   return next();
// }

dbController.checkForUsername = async(req, res, next) => {
  const { username } = req.body 

  const checkForUsernameQuery = `
    SELECT FROM users 
    WHERE username=$1`
  
  const checkForUsername = await db.query(checkForUsernameQuery, [username])
  // console.log(checkForUsername)

  if (checkForUsername.rows.length) {
    res.locals.username = true
  }
  else {
    res.locals.username = false
  }
  return next()
}

dbController.checkForEmail = async(req, res, next) => {
  const { email } = req.body 

  const checkForEmailQuery = `
    SELECT FROM users 
    WHERE email=$1`
  
  const checkForEmail = await db.query(checkForEmailQuery, [email])
  // console.log(checkForEmail)

  if (checkForEmail.rows.length) {
    res.locals.email = true
  }
  else {
    res.locals.email = false
  }
  return next()
}


export default dbController;
