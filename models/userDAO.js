const DB = require('../models/database');

module.exports = {

	getUsers() {
		return DB.accessor.query('SELECT * FROM users')
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		});
	},

	getUserOne(id) {
		return DB.accessor.query(
			'SELECT * FROM users WHERE id = $(userID)',
			{ userID: id }
			)
		.then((result) => {
			return result [0]
		})
		.catch((error) => {
			throw error;
		});
	},

	postUser(name, email, alliance_id) {
		return DB.accessor.query(
			'INSERT INTO users(name, email, alliance_id) VALUES($(UserName),$(UserEmail),$(UserAlliance)) RETURNING *',
			{ UserName: name, UserEmail: email, UserAlliance: alliance_id }
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	deleteUser(id) {
		return DB.accessor.query(
			'DELETE FROM users WHERE id = $(userID)',
			{ userID: id }
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	putUser(name, email, alliance_id, id) {
		return DB.accessor.query(
			'UPDATE users SET name = $(UserName), email = $(UserEmail), alliance_id = $(UserAlliance) WHERE id = $(userID) RETURNING *',
			{ UserName: name, userID:id, UserAlliance: alliance_id, UserEmail:email
			}
			)
		.then((result) => {
			return result [0];
		})
		.catch((error) => {
			throw error;
		});
	},

	getUserCharacters(id)
	{
		return DB.accessor.query(
			'SELECT * from characters WHERE user_id = $(userID)',
			{
				userID : id
			}
			)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}
};