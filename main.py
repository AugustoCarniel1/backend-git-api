import base64
import json

import requests
from fastapi import FastAPI
from github import Github


def create_user_object(user):

    user_dict = {
        "Node ID": user.node_id,
        "Twitter Username": user.twitter_username,
        "Avatar": user.avatar_url,
        "Biography": user.bio,
        "Blog": user.blog,
        "Collaborators": user.collaborators,
        "Company": user.company,
        "Contributions": user.contributions,
        "Created At": user.created_at,
        "Disk Usage": user.disk_usage,
        "Email": user.email,
        "Events": user.events_url,
        "Followers": user.followers,
        "Following": user.following,
        "Location": user.location,
        "Login": user.login,
        "Name": user.name
    }

    return user_dict


def create_repo_object(repo):

    repo_dict = {
        'Full Name': repo.full_name,
        'Description': repo.description,
        'Date created': repo.created_at,
        'Date of last push': repo.pushed_at,
        'Home Page': repo.homepage,
        'Language': repo.language,
        'Number of forks': repo.forks,
        'Number of stars': repo.stargazers_count,
    }

    try:
        repo_dict['License'] = base64.b64decode(
            repo.get_license().content.encode()).decode()
    except:
        pass

    return repo_dict


app = FastAPI()

git_url = 'https://api.github.com/'


@app.get('/')
def home():
    return 'Opa'


@app.get('/api/users')
def list_users(number: int = 1):

    url = git_url + 'users?since=' + str(number)
    print(url)

    user_data = requests.get(url).json()

    return user_data


@app.get('/api/users/{username}/details')
def check_user_info(username: str):

    git = Github('AugustoCarniel1', 'Monaliza@22')

    user_data = git.get_user(username)

    return create_user_object(user_data)


@app.get('/api/users/{username}/repos')
def check_user_repos(username: str):

    git = Github('AugustoCarniel1', 'Monaliza@22')

    repos = git.get_user(username).get_repos()

    repos_list = []

    for repo in repos:
        repo_dict = create_repo_object(repo)
        repos_list.append(repo_dict)

    return {'repositories': repos_list}
