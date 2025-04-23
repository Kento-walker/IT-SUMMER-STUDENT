angular.module('flaggingApp', [])
    .controller('FlaggingController', function($scope, $http, $interval) {
        $scope.backendUrl = 'http://localhost:3000';
        $scope.backendConnected = false;
        $scope.isLoading = false;
        $scope.errorMessage = '';
        $scope.flags = [];
        
        // Initialize candidate model
        $scope.candidate = {
            name: '',
            nacExam: null,
            mccqe1Result: null,
            canadianExperience: null,
            practiceGaps: null
        };
        
        // Load saved flags from localStorage
        const loadSavedFlags = () => {
            const savedFlags = localStorage.getItem('candidateFlags');
            if (savedFlags) {
                $scope.flags = JSON.parse(savedFlags);
            }
        };
        
        // Save flags to localStorage
        const saveFlags = () => {
            localStorage.setItem('candidateFlags', JSON.stringify($scope.flags));
        };
        
        // Load saved flags on startup
        loadSavedFlags();
        
        // Check backend connection
        const checkBackendConnection = () => {
            $http.get($scope.backendUrl + '/test')
                .then(() => {
                    $scope.backendConnected = true;
                    $scope.errorMessage = '';
                })
                .catch(() => {
                    $scope.backendConnected = false;
                    $scope.errorMessage = 'Backend server is not responding. Please check the connection.';
                });
        };
        
        // Check connection initially and every 10 seconds
        checkBackendConnection();
        $interval(checkBackendConnection, 10000);
        
        // Evaluate candidate
        $scope.evaluateCandidate = () => {
            if (!$scope.backendConnected) {
                $scope.errorMessage = 'Cannot evaluate: Backend server is not connected.';
                return;
            }
            
            $scope.isLoading = true;
            $scope.errorMessage = '';
            
            $http.post($scope.backendUrl + '/evaluate', $scope.candidate)
                .then(response => {
                    // Initialize flags with overridden property
                    $scope.flags = response.data.map(flag => ({
                        ...flag,
                        overridden: false
                    }));
                    saveFlags();
                    $scope.isLoading = false;
                })
                .catch(error => {
                    $scope.errorMessage = error.data?.message || 'An error occurred while evaluating the candidate.';
                    $scope.isLoading = false;
                });
        };
        
        // Toggle flag acknowledgment
        $scope.toggleAcknowledge = (flag) => {
            if (!flag.overridden) {
                flag.acknowledged = !flag.acknowledged;
                saveFlags();
            }
        };
        
        // Toggle flag override
        $scope.toggleOverride = (flag) => {
            if (!flag.acknowledged) {
                flag.overridden = !flag.overridden;
                saveFlags();
            }
        };
    }); 