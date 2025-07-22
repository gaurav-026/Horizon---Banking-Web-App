import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async ({searchParams }: SearchParamProps) => {
  const { id, page } = searchParams;
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  // console.log(loggedIn);
  if (!loggedIn || !loggedIn.$id) return;
  const accounts = await getAccounts({
    userId: loggedIn.$id 
  })
  
  if(!accounts) return;

  // Define the type for account items
  type AccountItem = {
    appwriteItemId: string;
    // add other properties as needed
  };

  const accountsData = accounts?.data as AccountItem[];
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId; 
  const account = await getAccount({appwriteItemId});

  // console.log("AccountsData", accountsData);
  // console.log("Account", account);

  return (
    <section className='home no-scrollbar'>
      <div className='home-content no-scrollbar gap-8'>
        <header className='home-header'>
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest" }
          subtext={"Access and manage your account and transactions efficiently."} />

          <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance} />
        </header>

        
        <RecentTransactions
        accounts = {accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage} />
      </div>

      {/* RIGHT SIDEBAR  */}
        <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0,2)}
         />
    </section>
  )
}

export default Home
