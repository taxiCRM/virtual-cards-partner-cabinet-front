import { Suspense } from 'react';

import { Pages } from 'pages';

import { Provider } from './Provider';

function App() {
  // const [currentUserLoading] = useUnit([getCurrentUserFx.pending]);

  // const [passLoading] = useUnit([getCurrentUserRoleByIdFx.pending]);

  return (
    <Provider>
      <Suspense
      // fallback={<Fallback />}
      >
        {/* {currentUserLoading || passLoading ? null : ( */}
        {/* // <Fallback /> */}
        <Pages />
        {/* )} */}
      </Suspense>
    </Provider>
  );
}

export default App;
