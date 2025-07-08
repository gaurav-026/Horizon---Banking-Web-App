import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Gaurav', lastName: 'Chakrawarti', email: 'gaurav@gmail.com'};
  return (
    <section className='home no-scrollbar'>
      <div className='home-content no-scrollbar gap-8'>
        <header className='home-header'>
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn ?.firstName || "Guest" }
          subtext={"Access and manage your account and transactions efficiently."} />

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35} />
        </header>

        
        
        RECENT TRANSACTIONS
      </div>

      {/* RIGHT SIDEBAR  */}
        <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50}, {currentBalance:1890}]}
         />
    </section>
  )
}

export default Home
