import { Router } from 'express';

const getGenericReqParams = req => ({
  ...req.query,
  id: req.params.id,
  language: req.language,
});

const prettyUrlRouter = ({ app }) => {
  const route = Router();

  route.get('/', async (req, res) => {
    return app.render(req, res, '/', getGenericReqParams(req));
  });
  route.get('/auth/signin', async (req, res) => {
    return app.render(req, res, '/sign-in', getGenericReqParams(req));
  });
  route.get('/tc-commands', async (req, res) => {
    return app.render(req, res, '/tc-commands', getGenericReqParams(req));
  });
  route.get('/devices', async (req, res) => {
    return app.render(req, res, '/devices', getGenericReqParams(req));
  });
  route.get('/user-list', async (req, res) => {
    return app.render(req, res, '/user-list', getGenericReqParams(req));
  });
  route.get('/firm-ware', async (req, res) => {
    return app.render(req, res, '/firm-ware', getGenericReqParams(req));
  });
  route.get('/exports', async (req, res) => {
    return app.render(req, res, '/exports', getGenericReqParams(req));
  });
  route.get('/meter-commissioning-report', async (req, res) => {
    return app.render(req, res, '/meter-commissioning-report', getGenericReqParams(req));
  });
  route.get('/upgrade-firmware', async (req, res) => {
    return app.render(req, res, '/upgrade-firmware', getGenericReqParams(req));
  });
  route.get('/device-group', async (req, res) => {
    return app.render(req, res, '/device-group', getGenericReqParams(req));
  });
  route.get('/data-settings', async (req, res) => {
    return app.render(req, res, '/data-settings', getGenericReqParams(req));
  });
  route.get('/meter-clients', async (req, res) => {
    return app.render(req, res, '/meter-clients', getGenericReqParams(req));
  });
  route.get('/vendors', async (req, res) => {
    return app.render(req, res, '/vendors', getGenericReqParams(req));
  });
  route.get('/dms-locks', async (req, res) => {
    return app.render(req, res, '/dms-locks', getGenericReqParams(req));
  });
  route.get('/dms-lock-event-logs', async (req, res) => {
    return app.render(req, res, '/dms-lock-event-logs', getGenericReqParams(req));
  });
  route.get('/p2-workers', async (req, res) => {
    return app.render(req, res, '/p2-workers', getGenericReqParams(req));
  });
  route.get('/batch-process-logs', async (req, res) => {
    return app.render(req, res, '/batch-process-logs', getGenericReqParams(req));
  });

  /*route.get('/dashboard', async (req, res) => {
    return app.render(req, res, '/exports', getGenericReqParams(req));
  });
  route.get('/deployments', async (req, res) => {
    return app.render(req, res, '/deployments', getGenericReqParams(req));
  });*/

  route.get('/task-schedule', async (req, res) => {
    return app.render(req, res, '/task-schedule', getGenericReqParams(req));
  });
  route.get('/report', async (req, res) => {
    return app.render(req, res, '/report', getGenericReqParams(req));
  });
  route.get('/report-repository', async (req, res) => {
    return app.render(req, res, '/report-repository', getGenericReqParams(req));
  });
  route.get('/building', async (req, res) => {
    return app.render(req, res, '/building', getGenericReqParams(req));
  });
  route.get('/units', async (req, res) => {
    return app.render(req, res, '/units', getGenericReqParams(req));
  });
  route.get('/floor-level', async (req, res) => {
    return app.render(req, res, '/floor-level', getGenericReqParams(req));
  });
  route.get('/building-unit', async (req, res) => {
    return app.render(req, res, '/building-unit', getGenericReqParams(req));
  });
  route.get('/audit', async (req, res) => {
    return app.render(req, res, '/audit', getGenericReqParams(req));
  });
  route.get('/roles', async (req, res) => {
    return app.render(req, res, '/roles', getGenericReqParams(req));
  });
  route.get('/group', async (req, res) => {
    return app.render(req, res, '/group', getGenericReqParams(req));
  });
  route.get('/my-group', async (req, res) => {
    return app.render(req, res, '/my-group', getGenericReqParams(req));
  });
  route.get('/no-authorization', async (req, res) => {
    return app.render(req, res, '/no-authorization', getGenericReqParams(req));
  });
  route.get('/upload', async (req, res) => {
    return app.render(req, res, '/upload', getGenericReqParams(req));
  });
  route.get('/setting', async (req, res) => {
    return app.render(req, res, '/setting', getGenericReqParams(req));
  });
  route.get('/capp/application/:id', async (req, res) => {
    return app.render(req, res, '/capp-application', getGenericReqParams(req));
  });
  route.get('/address-logs', async (req, res) => {
    return app.render(req, res, '/address-logs', getGenericReqParams(req));
  });
  route.get('/p2-step', async (req, res) => {
    return app.render(req, res, '/p2-step', getGenericReqParams(req));
  });
  route.get('/p1-detail-report', async (req, res) => {
    return app.render(req, res, '/p1-provisioning', getGenericReqParams(req));
  });
  route.get('/p1-summary-report', async (req, res) => {
    return app.render(req, res, '/p1-summary-report', getGenericReqParams(req));
  });
  route.get('/p2-provisioning-report', async (req, res) => {
    return app.render(req, res, '/p2-provisioning-report', getGenericReqParams(req));
  });
  route.get('/p2-ack-report', async (req, res) => {
    return app.render(req, res, '/p2-ack-report', getGenericReqParams(req));
  });
  route.get('/device-logs', async (req, res) => {
    return app.render(req, res, '/device-logs', getGenericReqParams(req));
  });
  route.get('/relay-status-command-logs', async (req, res) => {
    return app.render(req, res, '/relay-status-command-logs', getGenericReqParams(req));
  });
  route.get('/p1-online-check', async (req, res) => {
    return app.render(req, res, '/p1-online-status-report', getGenericReqParams(req));
  });
  route.get('/project-tag', async (req, res) => {
    return app.render(req, res, '/project-tag', getGenericReqParams(req));
  });
  route.get('/company', async (req, res) => {
    return app.render(req, res, '/company', getGenericReqParams(req));
  });
  route.get('/devices-meter', async (req, res) => {
    return app.render(req, res, '/devices-meter', getGenericReqParams(req));
  });
  route.get('/dms-site-management', async (req, res) => {
    return app.render(req, res, '/dms-site-management', getGenericReqParams(req));
  });
  route.get('/dms-work-orders', async (req, res) => {
    return app.render(req, res, '/dms-work-orders', getGenericReqParams(req));
  });
  route.get('/dms-project-management', async (req, res) => {
    return app.render(req, res, '/dms-project-management', getGenericReqParams(req));
  });
  route.get('/dms-application-management', async (req, res) => {
    return app.render(req, res, '/dms-application-management', getGenericReqParams(req));
  });
  route.get('/view-management', async (req, res) => {
    return app.render(req, res, '/view-management', getGenericReqParams(req));
  });
  route.get('/dms-vendor-management', async (req, res) => {
    return app.render(req, res, '/dms-vendor-management', getGenericReqParams(req));
  });
  route.get('/e-code', async (req, res) => {
    return app.render(req, res, '/dms-get-ecode', getGenericReqParams(req));
  });
  route.get('/dms-locks-access-permission', async (req, res) => {
    return app.render(req, res, '/dms-locks-access-permission', getGenericReqParams(req));
  });

  return route;
};

export default prettyUrlRouter;
