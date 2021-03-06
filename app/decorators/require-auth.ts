import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import { Registry as ServiceRegistry } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

import CurrentUser from 'ember-osf-web/services/current-user';
import transitionTarget from 'ember-osf-web/utils/transition-target';

/**
 * Class decorator for Routes.
 * In the `beforeModel` hook, check whether the user is logged in.
 * If they are, let the transition continue as normal.
 * If not, transition to the given route or redirect to the login page.
 *
 * For best results, make sure the decorated route (or one of its parent/ancestor
 * routes) is decorated with @checkAuth (ember-osf-web/decorators/check-auth).
 *
 * Use:
 * ```
 * // If not logged in, redirect to login page
 * @requireAuth()
 * class MyRoute extends Route { ... }
 *
 * // If not logged in, transition to 'home' route
 * @requireAuth('home')
 * class MyRoute extends Route { ... }
 * ```
 *
 * Uses the mixin pattern here: https://github.com/Microsoft/TypeScript/pull/13743
 */
export default function requireAuthFactory(
    redirectRoute?: string,
) {
    function requireAuthDecorator<T extends Newable<Route>>(RouteSubclass: T) {
        class RequireAuthRoute extends RouteSubclass {
            @service router!: ServiceRegistry['router'];
            @service session!: SessionService;
            @service currentUser!: CurrentUser;

            async beforeModel(transition: any) {
                if (!this.session.isAuthenticated) {
                    if (redirectRoute) {
                        transition.abort();
                        this.transitionTo(redirectRoute);
                    } else {
                        await this.currentUser.login(
                            transitionTarget(transition, this.router),
                        );
                    }
                }

                return super.beforeModel(transition);
            }
        }

        return RequireAuthRoute;
    }
    return requireAuthDecorator;
}
