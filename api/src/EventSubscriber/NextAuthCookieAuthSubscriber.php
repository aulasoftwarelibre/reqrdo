<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class NextAuthCookieAuthSubscriber implements EventSubscriberInterface
{
    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        if (! $request->cookies->has('next-auth_session-token')) {
            return;
        }

        $jwt = $request->cookies->get('next-auth_session-token');
        $request->headers->set('authorization', "Bearer ${jwt}");
    }

    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest', 10],
        ];
    }
}
