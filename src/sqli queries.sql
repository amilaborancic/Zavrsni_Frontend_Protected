--Upit za pretragu itema bi mogao izgledati ovako:

SELECT x FROM x WHERE x LIKE '%rijec%';

--x u ovom slucaju oznacava da ne znamo kako se zovu tabele i kolone (posto ni napadac to ne zna)

--ako u search bar ukucamo: ';%23*
--app ce nam vratiti sve items iz baze
--%23 oznacava tarabu (#) koja se koristi kao komentar u sql-u
--dakle upit glasi ovako:

SELECT x from x WHERE x LIKE '%Galaxy' AND 1=SLEEP(2);#%';

SELECT x FROM x WHERE x LIKE '%';#%'

--ugl ovdje javlja gresku jer sql i mysql nisu bas identicni po pitanju komentara. U sql komentar -- radi normala, u mysql kakok kad.
U mysql za komentare koristiti #
