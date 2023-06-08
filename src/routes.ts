const host = 'https://api.green-api.com';

const routes = {
  getStateInstance: (id: string, token: string) => `${host}/waInstance${id}/getStateInstance/${token}`,
  receiveNotification: (id: string, token: string) => `${host}/waInstance${id}/receiveNotification/${token}`,
  deleteNotification: (instanceId: string, token: string, notificationId: number) => `${host}/waInstance${instanceId}/deleteNotification/${token}/${notificationId}`,
  getChats: (id: string, token: string) => `${host}/waInstance${id}/getChats/${token}`,
};

export default routes;
