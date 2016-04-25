INSERT INTO App (AppId, Name, OwnerName, OwnerEmail) VALUES ('someAppId','someAppName','someOwnerName','someOwnerName@ctrip.com');

INSERT INTO Cluster (AppId, Name) VALUES ('someAppId', 'default');
INSERT INTO Cluster (AppId, Name) VALUES ('someAppId', 'someCluster');

INSERT INTO AppNamespace (AppId, Name) VALUES ('someAppId', 'someAppId');
INSERT INTO AppNamespace (AppId, Name) VALUES ('someAppId', 'someNamespace');

INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('someAppId', 'default', 'someAppId');
INSERT INTO Namespace (AppId, ClusterName, NamespaceName) VALUES ('someAppId', 'someCluster', 'someNamespace');

INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations) VALUES (990, 'INTEGRATION-TEST-DEFAULT','First Release','someAppId', 'default', 'application', '{"k1":"v1"}');
INSERT INTO RELEASE (id, Name, Comment, AppId, ClusterName, NamespaceName, Configurations) VALUES (991, 'INTEGRATION-TEST-NAMESPACE','First Release','someAppId', 'someCluster', 'someNamespace', '{"k2":"v2"}');
