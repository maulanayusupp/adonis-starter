'use strict'

class ProfileController {
	profile({view}) {
		var user = {
			name: 'Maulana Yusup Abdullah'
		};
		return view.render('user.profile', user);
	}
}

module.exports = ProfileController
