import * as authCheckSaga from 'store/ducks/auth/saga/authCheck'
import * as actions from 'store/ducks/auth/actions'
import * as Logger from 'services/Logger'
import { testSaga } from 'redux-saga-test-plan'
import dayjs from 'dayjs'

describe('authCheckRequest saga', () => {
	test('authenticates user successfully', () => {
	  const saga = testSaga(authCheckSaga.authCheckRequest, {})
	  const getCognitoCredentialsResponse = {
	  	username: 'us-east-1:e0e385ef-a285-4ad1-94d3-b49c86c24df7',
	  	authenticationFlowType: 'USER_SRP_AUTH',
	  }
	  const handleAuthCheckRequestResponse = {
	  	data: {
	  		self: {
	  			userId: 'us-east-1:e0e385ef-a285-4ad1-94d3-b49c86c24df7',
          username: 'azim',
          email: 'test@email.com',
	  			photo: {
	  				url: 'https://d1mx3y90ofnxy6.cloudfront.net/us-east-1:e0e385ef-a285-4ad1-94d3-b49c86c24df7/profile-photo/c1f4db60-902c-426f-8a04-a5053d6145b6/native.jpg',
	  			},
	  		},
	  	},
	  }
	  const nextRoute = 'Root'
	  const authCheckRequestDataResponse = {
	    data: 'us-east-1:e0e385ef-a285-4ad1-94d3-b49c86c24df7',
	    meta: {},
	  }
	  const authCheckSuccessResponse = {
	  	data: authCheckRequestDataResponse.data,
	  	payload: authCheckRequestDataResponse.payload,
      nextRoute,
    }

	  saga
      .next()
      .call(authCheckSaga.getCognitoCredentials)
      
      .next(getCognitoCredentialsResponse)
      .call(authCheckSaga.handleAuthCheckRequest, getCognitoCredentialsResponse)
      
      .next(handleAuthCheckRequestResponse)
      .call(authCheckSaga.authCheckRequestData, {}, handleAuthCheckRequestResponse)
      
      .next(authCheckRequestDataResponse)
      .call(authCheckSaga.getAuthCheckNextRoute, handleAuthCheckRequestResponse)
      
      .next(nextRoute)
      .put(actions.authCheckSuccess(authCheckSuccessResponse))

      .next(authCheckSuccessResponse)
      .call([Logger, 'setUser'], { 
        id: handleAuthCheckRequestResponse.data.self.userId,
        username: handleAuthCheckRequestResponse.data.self.username,
        email: handleAuthCheckRequestResponse.data.self.email, 
      })

      .next()
	    .isDone()
	})

	test('authentication credentials throws an error', () => {
	  const saga = testSaga(authCheckSaga.authCheckRequest, {})
	  const getCognitoCredentialsError = new Error('Authentication Failed')
	  const authCheckFailureResponse = {
      message: {
        code: 'GENERIC',
        text: 'Failed to authorize',
        nativeError: 'Authentication Failed',
      },
      nextRoute: 'AuthHome',
    }

	  saga
	    .next()
	    .call(authCheckSaga.getCognitoCredentials)
	    .next()
      .throw(getCognitoCredentialsError)
      .call(authCheckSaga.getPrimaryGraphqlError, getCognitoCredentialsError)
      .next()
      .call(authCheckSaga.getPrimaryClientError, getCognitoCredentialsError)
      .next()
	    .put(actions.authCheckFailure(authCheckFailureResponse))
      .next(authCheckFailureResponse)
	    .isDone()
	})

  test('network throws an error', () => {
    const saga = testSaga(authCheckSaga.authCheckRequest, {})
    const getCognitoCredentialsError = new Error('Authentication Failed')
    const authCheckFailureResponse = {
      message: {
        code: 'GENERIC',
        text: 'Failed to authorize',
        nativeError: 'Authentication Failed',
      },
      nextRoute: 'AuthHome',
    }

    saga
      .next()
      .call(authCheckSaga.getCognitoCredentials)
      .next()
      .throw(getCognitoCredentialsError)
      .call(authCheckSaga.getPrimaryGraphqlError, getCognitoCredentialsError)
      .next(authCheckSaga.getPrimaryGraphqlError(getCognitoCredentialsError))
      .call(authCheckSaga.getPrimaryClientError, getCognitoCredentialsError)
      .next(authCheckSaga.getPrimaryClientError(getCognitoCredentialsError))
      .put(actions.authCheckFailure(authCheckFailureResponse))
      .next(authCheckFailureResponse)
      .isDone()
  })

  test('user does not exist throws an error', () => {
    const saga = testSaga(authCheckSaga.authCheckRequest, {})
    const getCognitoCredentialsResponse = {
      username: 'us-east-1:e0e385ef-a285-4ad1-94d3-b49c86c24df7',
      authenticationFlowType: 'USER_SRP_AUTH',
    }
    const handleAuthCheckRequestError = {
      data: null,
      errors: [{
        errorType: 'ClientError',
        message: 'User does not exist',
      }],
    }
    const authCheckFailureResponse = {
      message: {
        code: 'USER_JUST_CREATED',
        text: 'Username must be assigned',
        nativeError: '',
      },
      nextRoute: 'AuthCognito',
    }

    saga
      .next()
      .call(authCheckSaga.getCognitoCredentials)
      .next(getCognitoCredentialsResponse)
      .call(authCheckSaga.handleAuthCheckRequest, getCognitoCredentialsResponse)
      .throw(handleAuthCheckRequestError)
      .call(authCheckSaga.getPrimaryGraphqlError, handleAuthCheckRequestError)
      .next(authCheckSaga.getPrimaryGraphqlError(handleAuthCheckRequestError))
      .call(authCheckSaga.getPrimaryClientError, handleAuthCheckRequestError)
      .next(authCheckSaga.getPrimaryClientError(handleAuthCheckRequestError))
      .put(actions.authCheckFailure(authCheckFailureResponse))
      .next(authCheckFailureResponse)
      .isDone()
  })

  describe('Next route after success auth check', () => {
    test('redirect a user right after sign up to profile photo upload', () => {
      const newUser= { signedUpAt: new Date().toString() }
      const response = { data: { self: newUser } }

      expect(authCheckSaga.getAuthCheckNextRoute(response)).toBe('AuthPhoto')
    })

    test('redirect an old user to root screen', () => {
      const user= { signedUpAt: dayjs().subtract(1, 'minute').toString() }
      const response = { data: { self: user } }

      expect(authCheckSaga.getAuthCheckNextRoute(response)).toBe('Root')
    })
  })
  
})
