# Employees Management Web App

### Code Structure
![Code Structure](images/Code-Structure.png)

In this Angular Application, we are using Lazy Loadding Patern: For large applications with lots of routes, consider lazy loading design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times. for more informations you can check here: https://angular.io/guide/lazy-loading-ngmodules
![Lazy Laoding](images/Lazy-loading.png)

### Dockerfile

![Dockerfile-front.png](images%2FDockerfile-front.png)

## Deployment using Docker-compose
- For local deployment, check this repo and using docker compose: https://github.com/devsahamerlin/terraform-private-gke-mongodb-atlas/blob/main/LOCAL-DEPLOYMENT.md


## This below is Only for GCP CI Deployment using Artifact Registry

![GitHub Actions CI](images/GitHub-Action-To-Artifact-Registry-angular.png)


### Fork This Repo on your GitHub Account
### Setup GCP and GitHub Actions
### GitHub Actions Pipelines
- Feature Pipeline

![feature-pipeline.png](images%2Ffeature-pipeline.png)

- Pull Request Pipeline

![pull-request-pipeline.png](images%2Fpull-request-pipeline.png)

- Main Pipeline

![main-pipeline.png](images%2Fmain-pipeline.png)

#### You can use our Youtube Video demo here:
#### Or follow manual step bellow

1. You must have GCP Project and Known your PROJECT_ID
2. Fork this repository on your own git account
3. Go to GCP `IAM & Admin`-> `Service Account`, then click on `github-actions-ar-sa@<PROJECT_ID>.iam.gserviceaccount.com` if you are using the IaC Terraform code provided or Create a service account `github-actions-ar-sa@<PROJECT_ID>.iam.gserviceaccount.com` with the following Rules: `roles/artifactregistry.writer`
4. Generate Key:
    - Click on the service account, in the Tab menu, click on `KEYS`, click on `ADD KEYS`, click on `Create New Key` and choose `JSON`, then click on `CREATE`

    * Select Service Account
   
      ![IAM & Admin](images/IAM-Admin.png)

    * Click on `Create New Key`
   
      ![Create Keys](images/Create-Keys.png)

    * Click on `CREATE`
   
      ![Generate Keys](images/generate-Keys.png)


5. Add the content of your GCP Credentials file on GitHub Actions secret

- Google Cloud Recommend to Use `Workload Identity Provider` with GitHub Actions, you can get details here and how to use it https://cloud.google.com/blog/products/identity-security/enabling-keyless-authentication-from-github-actions. We added both options in GitHub Actions workflows, if you are using The Terraform provided code for your Infrastructure, then you can use it, by uncommenting `workload_identity_provider` step in `.github/worklows/main.yml line 37 to 42` and comment `line 32 to 35`

- On your project repository click on Settings -> Secrets & variables -> New Repository Secret and paste the Json content of your credentials file. give name as `GOOGLE_APPLICATION_CREDENTIALS` and click on Add secret

  ![Add GCP Credentials on GitHub Actions](images/Add-gcp-credentials-on-GitHub.png)

* Key content

  ![GCP Credentials on GitHub Actions](images/GitHub-GCP-Credentials.png)

- Repeat to add these Secrets to GitHub Actions:
```sh
    GCP_PROJECT_ID # your gcp project id
    GCP_PROJECT_NUMBER # (Optional)  If you choose to use Workload Identity Provider, your can you gcp project number directly on the GCP Welcom page when you select projet, is like this 123456789
```

- All Secrets Result

  ![GitHub Actions All Secrets](images/All-secrets-on-GitHub-Actions.png)

6. Make change on a feature branch, then create a Pull Request and Merge to `main` branch to start the pipeline. or directly push new change on `main` branch

7. If you follow all steps correctly, your image will be push on GCP Artifact Registry


### If you want to Run application
- Install all dependencies
```javascript
npm i
```

- Start application
```javascript
ng serve
```
