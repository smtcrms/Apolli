INSERT INTO Cluster (AppId, IsDeleted, Name) VALUES (100, 0, 'default');
INSERT INTO Cluster (AppId, IsDeleted, Name) VALUES (101, 0, 'default');

INSERT INTO Version (AppId, IsDeleted, Name, ReleaseId) VALUES (101, 0, '1.0', 1);
INSERT INTO Version (AppId, IsDeleted, Name, ReleaseId) VALUES (102, 0, '1.0', 2);

INSERT INTO RELEASESNAPSHOT (ClusterName, IsDeleted, ReleaseId, Configurations) VALUES ('default', 0, 1, '{"apollo.foo":"bar", "apollo.bar":"foo"}');
INSERT INTO RELEASESNAPSHOT (ClusterName, IsDeleted, ReleaseId, Configurations) VALUES ('default', 0, 2, '{"demo.foo":"demo1", "demo.bar":"demo2"}');
INSERT INTO RELEASESNAPSHOT (ClusterName, IsDeleted, ReleaseId, Configurations) VALUES ('default', 0, 3, '{"apollo.foo":"another bar", "apollo.bar_new":"foo"}');
