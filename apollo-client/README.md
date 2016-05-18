## Maven Dependency
		<dependency>
			<groupId>com.ctrip.apollo</groupId>
			<artifactId>apollo-client</artifactId>
			<version>0.0.1-SNAPSHOT</version>
		</dependency>

##	Client Usage

### 1. Load config from default namespace(application)
```java
Config config = ConfigService.getAppConfig();
String someKey = "someKeyFromDefaultNamespace";
String someDefaultValue = "someDefaultValueForTheKey";
System.out.println(String.format("Value for key %s is %s", someKey, config.getProperty(someKey, someDefaultValue)));
```

### 2. Register config change listener
```java
Config config = ConfigService.getAppConfig();
config.addChangeListener(new ConfigChangeListener() {
	@Override
	public void onChange(ConfigChangeEvent changeEvent) {
		System.out.println("Changes for namespace " + changeEvent.getNamespace());
		for (String key : changeEvent.changedKeys()) {
			ConfigChange change = changeEvent.getChange(key);
			System.out.println(String.format("Found change - key: %s, oldValue: %s, newValue: %s, changeType: %s", change.getPropertyName(), change.getOldValue(), change.getNewValue(), change.getChangeType()));
		}
	}
});
```

### 3. Load config from public namespace
```java
String somePublicNamespace = "CAT";
Config config = ConfigService.getConfig(somePublicNamespace);
String someKey = "someKeyFromPublicNamespace";
String someDefaultValue = "someDefaultValueForTheKey";
System.out.println(String.format("Value for key %s is %s", someKey, config.getProperty(someKey, someDefaultValue)));
```