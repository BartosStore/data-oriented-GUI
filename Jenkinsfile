pipeline {
    agent any

    environment {
        REGISTRY = 'registry_url'
    }

    stages {
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'login',
                    usernameVariable: 'REGISTRY_USER',
                    passwordVariable: 'REGISTRY_PASS',
                )]) {
                   sh "docker login -u $REGISTRY_USER -p $REGISTRY_PASS $REGISTRY"
                }
            }
        }
        stage('Test') {
            steps {
                sh "make docker-test TAG=$GIT_BRANCH"
            }
        }
        stage('Build') {
            steps {
                sh "make docker-build TAG=$GIT_BRANCH"
            }
        }
    }

    post {
            always {
                sh "make docker-clear TAG=$GIT_BRANCH"
                sh "make docker-test-clear TAG=$GIT_BRANCH"
            }
        }
}
