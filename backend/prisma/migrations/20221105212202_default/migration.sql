-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" SERIAL NOT NULL,
    "idContato" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
