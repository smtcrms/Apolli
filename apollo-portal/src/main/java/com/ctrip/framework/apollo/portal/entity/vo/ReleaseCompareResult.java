package com.ctrip.framework.apollo.portal.entity.vo;

import java.util.LinkedList;
import java.util.List;

public class ReleaseCompareResult {

  private List<Change> changes = new LinkedList<>();

  public void addEntityPair(ChangeType type, KVEntity firstEntity, KVEntity secondEntity) {
    changes.add(new Change(type, new EntityPair<>(firstEntity, secondEntity)));
  }

  public List<Change> getChanges() {
    return changes;
  }

  public void setChanges(List<Change> changes) {
    this.changes = changes;
  }

  public class Change {

    private ChangeType type;
    private EntityPair<KVEntity> entity;

    public Change(ChangeType type, EntityPair<KVEntity> entity) {
      this.type = type;
      this.entity = entity;
    }

    public ChangeType getType() {
      return type;
    }

    public void setType(ChangeType type) {
      this.type = type;
    }

    public EntityPair<KVEntity> getEntity() {
      return entity;
    }

    public void setEntity(
        EntityPair<KVEntity> entity) {
      this.entity = entity;
    }
  }

  public enum ChangeType {
    ADD, MODIFY, DELETE
  }
}
