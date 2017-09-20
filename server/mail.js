const r = require('./db');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/');
})
	.get('/:id', (req, res) => {
		r.table('emails')
			.get(req.params.id)
			.run(r.conn, (err, result) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500 });
				} else if (!result) {
					res.status(404).render('error.pug', { status: 404 });
				} else {
					const date = new Date(result.timestamp * 1000);
					res.render('mail.pug', { email: result, datestamp: date.toUTCString() });
				}
			});
	})
	.get('/view/:id', (req, res) => {
		r.table('emails')
			.get(req.params.id)
			.run(r.conn, (err, result) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500 });
				} else if (!result) {
					res.status(404).render('error.pug', { status: 404 });
				} else {
					res.render('mailiframe.pug', { email: result });
				}
			});
	});

module.exports = router;
