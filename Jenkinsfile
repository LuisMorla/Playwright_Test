pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '-u root:root'
        }
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'results.xml'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install --force'
            }
        }

        stage('Run Playwright regression') {
            when {
                expression { env.CHANGE_TARGET == null || env.CHANGE_TARGET.equalsIgnoreCase('development') }
            }
            steps {
                sh 'npx playwright test --reporter=list,junit,html'
            }
        }
    }

    //post

    post {
        always {
            junit allowEmptyResults: true, testResults: 'results.xml'
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}