# gitfetch
### gitfetch is a CLI tool that can fetch your Github or Gitlab profile

## Setting up
- Install Node.JS 16
- Clone the repo ```https://github.com/shanepaton/gitfetch```
- Extract to your folder of choice
- Make a copy of ```example.conf``` and name it ```conf.toml``` then put your info in.
- Install the dependencies ```npm install```
- Run ```node index.js``` with your username/id and your platform

## Command Syntax
- Usage: ``` gitfetch <Github Username / Gitlab ID> <Platform (--github / --gitlab)> --option ```

## Configuration
- In the ```conf.toml``` file there are some configs you can change
```toml
# Github Username
githubUsername = ""

# Gitlab ID
gitlabId = ""

# Insert Gitlab Personal Access Token here
gitlabToken = ""

# (github / gitlab)
defaultSite = ""
```
- ```githubUsername```'s value can be replaced with your Github Username.
- ```gitlabId```'s value can be replaced with your Gitlab ID.
- ```gitlabToken```'s value should be replaced with your Gitlab token or else fetching Gitlab will not work.
- ```defaultSite```'s value can be replaced so if you fetch without specifying the platform it fetches the one from the config.

If you run the program with out specifying the Username/ID and the Platform it will try to use the one from the ```conf.toml```.

gitfetch is created by Shane Paton under the MIT Licence
