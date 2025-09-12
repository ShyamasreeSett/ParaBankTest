pipeline {
    agent any

    tools {
        nodejs 'NodeJS-16'
    }

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
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
