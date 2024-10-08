import { Router } from 'express';
import { authenticateUser } from '../../../helpers/authentication.js';
import { authorizeUser } from '../../../helpers/authorization.js';
import checkIsCloud from '../../../helpers/check-is-cloud.js';
import getCurrentUserAction from '../../../controllers/api/v1/users/get-current-user.js';
import updateCurrentUserAction from '../../../controllers/api/v1/users/update-current-user.js';
import getUserTrialAction from '../../../controllers/api/v1/users/get-user-trial.ee.js';
import getAppsAction from '../../../controllers/api/v1/users/get-apps.js';
import getInvoicesAction from '../../../controllers/api/v1/users/get-invoices.ee.js';
import getSubscriptionAction from '../../../controllers/api/v1/users/get-subscription.ee.js';
import getPlanAndUsageAction from '../../../controllers/api/v1/users/get-plan-and-usage.ee.js';
import acceptInvitationAction from '../../../controllers/api/v1/users/accept-invitation.js';
import forgotPasswordAction from '../../../controllers/api/v1/users/forgot-password.js';
import resetPasswordAction from '../../../controllers/api/v1/users/reset-password.js';

const router = Router();

router.get('/me', authenticateUser, getCurrentUserAction);
router.patch('/:userId', authenticateUser, updateCurrentUserAction);
router.get('/:userId/apps', authenticateUser, authorizeUser, getAppsAction);
router.get('/invoices', authenticateUser, checkIsCloud, getInvoicesAction);

router.get(
  '/:userId/trial',
  authenticateUser,
  checkIsCloud,
  getUserTrialAction
);

router.get(
  '/:userId/subscription',
  authenticateUser,
  checkIsCloud,
  getSubscriptionAction
);

router.get(
  '/:userId/plan-and-usage',
  authenticateUser,
  checkIsCloud,
  getPlanAndUsageAction
);

router.post('/invitation', acceptInvitationAction);
router.post('/forgot-password', forgotPasswordAction);
router.post('/reset-password', resetPasswordAction);

export default router;
