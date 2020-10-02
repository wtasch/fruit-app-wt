
# Heroku Deployment

## Practice App Starter Code (if needed... these use PostgreSQL)

- [Heroku Backend Starter with EJS](./fruit-app)

Push the app in personal GitHub account as public repo.

<br>

## Create Free Heroku Account

[Heroku Homepage](https://devcenter.heroku.com/)

![](https://i.imgur.com/hPAtUfN.png)

<br>

## Install the Heroku CLI

- [Install Docs](https://devcenter.heroku.com/articles/heroku-cli)

`brew install heroku`

<br>

## Deploy App

1. Make sure you are in your fruit-app folder.
2. `heroku create <WHAT-YOU-WANT-YOUR-HEROKU-APP-TO-BE-CALLED>`. This may ask you to login to heroku CLI in the browser. Use heroku login credentials.
3. Run `git remote -v`. You should now have at least `origin` and `heroku` remote URLs.  

	```
	heroku	https://git.heroku.com/fruit-app.git (fetch)
	heroku	https://git.heroku.com/fruit-app.git (push)
	origin	https://github.com/ishaarora01/fruit-app.git (fetch)
	origin	https://github.com/ishaarora01/fruit-app.git (push)
	```
	
4. Goto your [Heroku App Dashboard](https://dashboard.heroku.com/apps).

	![](https://i.imgur.com/UUc9KZ8.png)
	
5. Select your fruit-app
	
	![](https://i.imgur.com/L4yaEeY.png)
	
6. Click on "Configure Add-ons".
7. Search for Postgres, select "Heroku Postgres"
8. On the next screen choose Settings, then Reveal Config Vars

	![](https://i.imgur.com/4ViWw9g.png)
	
9. Heroku gives you a `DATABASE_URL` environment variable. This is the URL to your production database. Another way to check the configuration is by running `heroku config --app fruit-app` in `fruit-app` on the terminal.
10. In your app's `config/config.json` file, we want to use the environment to determine the database URI for our application to connect to.

	```
	"production": {
    	"use_env_variable": "DATABASE_URL"
  	}
	```

12. Heroku looks for instruction when starting your app. In this case, that instruction is to run node `server.js`. In package.json under scripts, add the following...

	```diff
	"scripts": {
	+    "start": "node server.js"
	}
	```
	
11. Next, push the changes to GitHub repo

	```js
	$ git add .
	$ git commit -m "heroku updates"
	$ git push heroku master
	```

11. Next, run migrations using sequelize-cli. If sequelize cli is not part of package.json dependencies, install it locally by running `npm install sequelize-cli` in the fruit-app. 

	```js
	heroku run sequelize db:migrate --env production -m --app fruit-app
	```
						OR
						
	Log into your app folder on the actual production server: `heroku run bash`
	
	```
	C02W61W9HV2L:fruit-app ishaarora$ heroku run bash
	Running bash on ⬢ fruit-app-1... up, run.2268 (Free)
	~ $ sequelize db:migrate
	
	Sequelize CLI [Node: 12.18.4, CLI: 6.2.0, ORM: 6.3.5]
	
	Loaded configuration file "config/config.json".
	Using environment "production".
	== 20200928144505-create-fruit: migrating =======
	== 20200928144505-create-fruit: migrated (0.037s)
	
	== 20200928185826-create-user: migrating =======
	== 20200928185826-create-user: migrated (0.025s)
	
	== 20200929174110-add-userId-to-fruits: migrating =======
	== 20200929174110-add-userId-to-fruits: migrated (0.012s)
	
	== 20200930141139-create-season: migrating =======
	== 20200930141139-create-season: migrated (0.020s)
	
	== 20200930143047-create-season-fruit: migrating =======
	== 20200930143047-create-season-fruit: migrated (0.024s)
	```
	
	> `ctrl+d` to exit from heroku bash
	
	
11. Run `heroku open` to open your app in the browser.

<br>


## Setup GitHub/Heroku Auto Deploy

1. Goto your Heroku dashboard and click on "Deploy"
2. For Deployment Method select GitHub
3. For Connect to GitHub type or paste the repo you want to connect.

	![](https://i.imgur.com/r6zkYYP.png)

4. Select "Enable Automatic Deploys"

	![](https://i.imgur.com/Z4marqA.png)

5. Now, whenever you push to your GitHub repo master branch Heroku will deploy a new build.

	![](https://i.imgur.com/ISTRvEv.png)
	
6. Next time you push a change to GitHub, your Heroku latest activity should show an automatic build:

	![](https://i.imgur.com/BVW7nxX.png)
	
<br>
