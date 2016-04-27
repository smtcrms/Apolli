INSERT INTO App (AppId, Name, OwnerName, OwnerEmail) VALUES ('someAppId','someAppName','someOwnerName','someOwnerName@ctrip.com');
INSERT INTO App (AppId, Name, OwnerName, OwnerEmail) VALUES ('somePublicAppId','somePublicAppName','someOwnerName','someOwnerName@ctrip.com');

INSERT INTO Cluster (AppId, Name) VALUES ('someAppId', 'default');
INSERT INTO Cluster (AppId, Name) VALUES ('someAppId', 'someCluster');
INSERT INTO Cluster (AppId, Name) VALUES ('somePublicAppId', 'default');
INSERT INTO Cluster (AppId, Name) VALUES ('somePublicAppId', 'someDC');

INSERT INTO AppNamespace (AppId, Name) VALUES ('someAppId', 'application');
INSERT INTO AppNamespace (AppId, Name) VALUES ('someAppId', 'someNamespace');
INSERT INTO AppNamespace (AppId, Name) VALUES ('somePublicAppId', 'application');
INSERT INTO AppNamespace (AppId, Name) VALUES ('somePublicAppId', 'somePublicNamespace');

INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('someAppId', 'default', 'application');
INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('someAppId', 'someCluster', 'someNamespace');
INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('somePublicAppId', 'default', 'application');
INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('somePublicAppId', 'someDC', 'somePublicNamespace');
INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('someAppId', 'default', 'somePublicNamespace');

INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations)
  VALUES (990, 'INTEGRATION-TEST-DEFAULT','First Release','someAppId', 'default', 'application', '{"k1":"v1"}');
INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations)
  VALUES (991, 'INTEGRATION-TEST-NAMESPACE','First Release','someAppId', 'someCluster', 'someNamespace', '{"k2":"v2"}');
INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations)
  VALUES (992, 'INTEGRATION-TEST-PUBLIC-DEFAULT','First Release','somePublicAppId', 'default', 'somePublicNamespace', '{"k1":"default-v1", "k2":"default-v2"}');
INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations)
 VALUES (993, 'INTEGRATION-TEST-PUBLIC-NAMESPACE','First Release','somePublicAppId', 'someDC', 'somePublicNamespace', '{"k1":"someDC-v1", "k2":"someDC-v2"}');
INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations)
 VALUES (994, 'INTEGRATION-TEST-DEFAULT-OVERRIDE-PUBLIC','First Release','someAppId', 'default', 'somePublicNamespace', '{"k1":"override-v1"}');
