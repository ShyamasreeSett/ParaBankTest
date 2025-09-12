pipeline {
    agent any

    parameters {
        choice(
            name: 'SUITE',
            choices: ['e2e', 'main'],
            description: 'Select which Playwright suite to run'
        )
    }

    stages {
        stage('Install & Test') {
            steps {
                bat "jenkins.bat %SUITE%"
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
}
