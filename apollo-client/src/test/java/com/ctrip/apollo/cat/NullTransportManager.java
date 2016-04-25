package com.ctrip.apollo.cat;

import com.dianping.cat.message.io.MessageSender;
import com.dianping.cat.message.io.TransportManager;
import com.dianping.cat.message.spi.MessageTree;

public class NullTransportManager implements TransportManager {

  private static final MessageSender nullMessageSender = new MessageSender() {

    @Override
    public void initialize() {

    }

    @Override
    public void send(MessageTree tree) {

    }

    @Override
    public void shutdown() {

    }

  };

  @Override
  public MessageSender getSender() {
    return nullMessageSender;
  }

}
