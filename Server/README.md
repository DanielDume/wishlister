# QuizApp

Run all commands from git bash (https://git-scm.com/downloads)

Make sure you have the latest versions of *Virtual Box* (https://www.virtualbox.org/wiki/Downloads) and *Vagrant* (https://www.vagrantup.com/downloads.html) installed.

After installing *Vagrant* run: `vagrant plugin install vagrant-vbguest`.

To clone the repo:
`git clone https://github.com/DanielDume/QuizApp.git`

To start the server:
`$ vagrant up`

To stop the server:
`$ vagrant halt`

To reload the server:
`$ vagrant ssh
 $ cd /vagrant/BarFinder
 $ make update`

To view server logs and other info:
`$ sudo -i pm2 monit`

The web page can be found on *10.10.10.10:3000/*.

 ## Documentation:
 - http://es6-features.org
 - https://expressjs.com
 - http://jqfundamentals.com/chapter/jquery-basics
 - https://pugjs.org/api/getting-started.html
 - https://notifyjs.com
 - https://github.com/Unitech/pm2
 - http://passportjs.org/docs
 - http://knexjs.org/
 - https://mariadb.com/kb/en/library/sql-statements/
