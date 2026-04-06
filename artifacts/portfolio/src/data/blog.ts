export interface BlogPost {
  slug: string;
  titleEn: string;
  titlePt: string;
  date: string;
  readingTime: number;
  category: string;
  tagsEn: string[];
  tagsPt: string[];
  excerptEn: string;
  excerptPt: string;
  contentEn: string;
  contentPt: string;
  coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "active-directory-best-practices",
    titleEn: "Active Directory Best Practices for SMBs",
    titlePt: "Boas Práticas de Active Directory para PMEs",
    date: "2025-03-15",
    readingTime: 7,
    category: "Sysadmin",
    tagsEn: ["Active Directory", "Windows Server", "Security", "SMB"],
    tagsPt: ["Active Directory", "Windows Server", "Segurança", "PME"],
    excerptEn:
      "Managing Active Directory in small and medium businesses can be challenging. Here are the practices I've adopted to keep environments secure and organised.",
    excerptPt:
      "Gerir o Active Directory em pequenas e médias empresas pode ser um desafio. Aqui estão as práticas que adotei para manter ambientes seguros e organizados.",
    coverEmoji: "🗂️",
    contentEn: `## Introduction

Active Directory (AD) is the backbone of identity management in most Windows environments. Yet, many SMBs treat it as a "set it and forget it" system — and that's where problems begin.

## 1. Enforce the Least Privilege Principle

Never assign Domain Admin rights to regular accounts. Create dedicated admin accounts used only for administrative tasks. Standard users should have only the permissions needed for their daily work.

\`\`\`powershell
# Check members of Domain Admins
Get-ADGroupMember -Identity "Domain Admins" | Select-Object Name, SamAccountName
\`\`\`

## 2. Organise with OUs (Organisational Units)

A flat AD structure is a management nightmare. Structure your OUs by department or function:

- **Computers/** → Workstations, Servers, Printers
- **Users/** → IT, Finance, HR, Management
- **Groups/** → Security Groups, Distribution Lists

## 3. Use Fine-Grained Password Policies

Don't rely on a single domain-wide policy. Use PSOs (Password Settings Objects) to apply stricter policies to privileged accounts:

\`\`\`powershell
# Create a strict policy for admins
New-ADFineGrainedPasswordPolicy -Name "AdminPolicy" \`
  -Precedence 10 \`
  -MinPasswordLength 16 \`
  -PasswordHistoryCount 24 \`
  -LockoutThreshold 3 \`
  -ComplexityEnabled $true
\`\`\`

## 4. Audit and Clean Up Stale Objects

Regularly remove inactive accounts and computers. A stale account is an open door for attackers.

\`\`\`powershell
# Find accounts inactive for 90+ days
$cutoff = (Get-Date).AddDays(-90)
Get-ADUser -Filter {LastLogonDate -lt $cutoff -and Enabled -eq $true} \`
  -Properties LastLogonDate | Select-Object Name, LastLogonDate
\`\`\`

## 5. Enable AD Recycle Bin

This feature saves you from accidental deletions — and it's just one command:

\`\`\`powershell
Enable-ADOptionalFeature "Recycle Bin Feature" \`
  -Scope ForestOrConfigurationSet \`
  -Target (Get-ADForest).Name
\`\`\`

## Conclusion

These five practices won't solve every problem, but they will significantly reduce your attack surface and make your AD environment much easier to manage. Start with the audit — you might be surprised by what you find.`,
    contentPt: `## Introdução

O Active Directory (AD) é a espinha dorsal da gestão de identidade na maioria dos ambientes Windows. No entanto, muitas PMEs tratam-no como um sistema de "configurar e esquecer" — e é aí que os problemas começam.

## 1. Aplica o Princípio do Menor Privilégio

Nunca atribuas direitos de Domain Admin a contas normais. Cria contas de administrador dedicadas, usadas apenas para tarefas administrativas. Os utilizadores padrão devem ter apenas as permissões necessárias para o seu trabalho diário.

\`\`\`powershell
# Verificar membros do Domain Admins
Get-ADGroupMember -Identity "Domain Admins" | Select-Object Name, SamAccountName
\`\`\`

## 2. Organiza com OUs (Unidades Organizacionais)

Uma estrutura AD plana é um pesadelo de gestão. Estrutura as tuas OUs por departamento ou função:

- **Computers/** → Workstations, Servers, Printers
- **Users/** → IT, Financeiro, RH, Gestão
- **Groups/** → Grupos de Segurança, Listas de Distribuição

## 3. Usa Fine-Grained Password Policies

Não dependa de uma única política ao nível do domínio. Usa PSOs (Password Settings Objects) para aplicar políticas mais rigorosas a contas privilegiadas:

\`\`\`powershell
# Criar política rigorosa para administradores
New-ADFineGrainedPasswordPolicy -Name "AdminPolicy" \`
  -Precedence 10 \`
  -MinPasswordLength 16 \`
  -PasswordHistoryCount 24 \`
  -LockoutThreshold 3 \`
  -ComplexityEnabled $true
\`\`\`

## 4. Audita e Limpa Objetos Obsoletos

Remove regularmente contas e computadores inativos. Uma conta obsoleta é uma porta aberta para atacantes.

\`\`\`powershell
# Encontrar contas inativas há 90+ dias
$cutoff = (Get-Date).AddDays(-90)
Get-ADUser -Filter {LastLogonDate -lt $cutoff -and Enabled -eq $true} \`
  -Properties LastLogonDate | Select-Object Name, LastLogonDate
\`\`\`

## 5. Ativa o AD Recycle Bin

Esta funcionalidade salva-te de eliminações acidentais — e é apenas um comando:

\`\`\`powershell
Enable-ADOptionalFeature "Recycle Bin Feature" \`
  -Scope ForestOrConfigurationSet \`
  -Target (Get-ADForest).Name
\`\`\`

## Conclusão

Estas cinco práticas não resolverão todos os problemas, mas reduzirão significativamente a tua superfície de ataque e tornarão o teu ambiente AD muito mais fácil de gerir. Começa pela auditoria — podes surpreender-te com o que encontras.`,
  },
  {
    slug: "pfsense-vlan-setup",
    titleEn: "Setting Up VLANs with pfSense: A Practical Guide",
    titlePt: "Configurar VLANs com pfSense: Um Guia Prático",
    date: "2025-01-28",
    readingTime: 9,
    category: "Networking",
    tagsEn: ["pfSense", "VLANs", "Networking", "Firewall", "Security"],
    tagsPt: ["pfSense", "VLANs", "Redes", "Firewall", "Segurança"],
    excerptEn:
      "VLANs are one of the most powerful tools for network segmentation. In this post I walk through how I set them up using pfSense in a real SMB environment.",
    excerptPt:
      "As VLANs são uma das ferramentas mais poderosas para segmentação de rede. Neste artigo mostro como as configurei usando pfSense num ambiente real de PME.",
    coverEmoji: "🔀",
    contentEn: `## Why VLANs Matter

Network segmentation is a fundamental security principle. Without VLANs, a compromised device on your network can potentially reach every other device. With VLANs, you contain the blast radius.

## My VLAN Design

In a typical SMB environment I work with, I use this VLAN scheme:

| VLAN ID | Name | Purpose |
|---------|------|---------|
| 10 | Management | Network devices, servers |
| 20 | Corporate | Staff workstations |
| 30 | Guests | Guest Wi-Fi, isolated |
| 40 | IoT | Printers, cameras, sensors |
| 50 | VoIP | IP phones |

## Step 1: Create VLANs in pfSense

Navigate to **Interfaces → Assignments → VLANs** and add each VLAN with the correct parent interface and VLAN tag.

## Step 2: Assign and Enable Interfaces

After creating the VLANs, assign them as interfaces under **Interfaces → Assignments**. Enable each one and set a static IP as the gateway for that subnet:

- VLAN 10: 192.168.10.1/24
- VLAN 20: 192.168.20.1/24
- VLAN 30: 192.168.30.1/24

## Step 3: Configure DHCP Scopes

Under **Services → DHCP Server**, enable DHCP for each VLAN interface and define the pool:

- VLAN 20 Pool: 192.168.20.100 → 192.168.20.200
- VLAN 30 Pool: 192.168.30.100 → 192.168.30.150

## Step 4: Firewall Rules

This is where the magic happens. For each VLAN interface, add rules to control traffic flow:

**Guest VLAN (30) — Internet only, isolated:**
\`\`\`
Block: Source=VLAN30 → Destination=192.168.10.0/24 (block management)
Block: Source=VLAN30 → Destination=192.168.20.0/24 (block corporate)
Allow: Source=VLAN30 → Destination=any (internet)
\`\`\`

**Corporate VLAN (20) — Full access:**
\`\`\`
Allow: Source=VLAN20 → Destination=any
\`\`\`

## Step 5: Configure Your Managed Switch

Tag the appropriate VLANs on each switch port. A port connecting to an AP should be a trunk carrying VLANs 20 and 30. An end-device port should be an access port in its VLAN.

## Lessons Learnt

- Always test connectivity after each change before moving on.
- Keep a VLAN documentation spreadsheet — you'll thank yourself later.
- Don't forget to allow DNS and DHCP where needed in your firewall rules.

VLANs are one of those things that seem complex at first but become second nature. Once you segment your network this way, you won't go back.`,
    contentPt: `## Porque é que as VLANs são Importantes

A segmentação de rede é um princípio fundamental de segurança. Sem VLANs, um dispositivo comprometido na tua rede pode potencialmente alcançar todos os outros dispositivos. Com VLANs, conténs o raio de impacto.

## O Meu Design de VLANs

Num ambiente típico de PME com que trabalho, uso este esquema de VLANs:

| VLAN ID | Nome | Propósito |
|---------|------|-----------|
| 10 | Gestão | Dispositivos de rede, servidores |
| 20 | Corporativa | Workstations de colaboradores |
| 30 | Convidados | Wi-Fi de convidados, isolado |
| 40 | IoT | Impressoras, câmeras, sensores |
| 50 | VoIP | Telefones IP |

## Passo 1: Criar VLANs no pfSense

Navega até **Interfaces → Assignments → VLANs** e adiciona cada VLAN com a interface pai correta e a tag VLAN.

## Passo 2: Atribuir e Ativar Interfaces

Depois de criar as VLANs, atribui-as como interfaces em **Interfaces → Assignments**. Ativa cada uma e define um IP estático como gateway para essa sub-rede:

- VLAN 10: 192.168.10.1/24
- VLAN 20: 192.168.20.1/24
- VLAN 30: 192.168.30.1/24

## Passo 3: Configurar Escopos DHCP

Em **Services → DHCP Server**, ativa o DHCP para cada interface VLAN e define o pool:

- Pool VLAN 20: 192.168.20.100 → 192.168.20.200
- Pool VLAN 30: 192.168.30.100 → 192.168.30.150

## Passo 4: Regras de Firewall

É aqui que a magia acontece. Para cada interface VLAN, adiciona regras para controlar o fluxo de tráfego:

**VLAN Convidados (30) — Apenas internet, isolado:**
\`\`\`
Bloquear: Origem=VLAN30 → Destino=192.168.10.0/24 (bloquear gestão)
Bloquear: Origem=VLAN30 → Destino=192.168.20.0/24 (bloquear corporativa)
Permitir: Origem=VLAN30 → Destino=qualquer (internet)
\`\`\`

**VLAN Corporativa (20) — Acesso total:**
\`\`\`
Permitir: Origem=VLAN20 → Destino=qualquer
\`\`\`

## Passo 5: Configurar o Switch Gerido

Etiqueta as VLANs apropriadas em cada porta do switch. Uma porta ligada a um AP deve ser um trunk com as VLANs 20 e 30. Uma porta de dispositivo final deve ser uma porta de acesso na sua VLAN.

## Lições Aprendidas

- Testa sempre a conectividade após cada alteração antes de avançar.
- Mantém uma folha de cálculo de documentação de VLANs — vais agradecer a ti próprio mais tarde.
- Não te esqueças de permitir DNS e DHCP onde for necessário nas tuas regras de firewall.

As VLANs são uma daquelas coisas que parecem complexas no início mas tornam-se naturais. Uma vez que segmentas a tua rede desta forma, não voltas atrás.`,
  },
  {
    slug: "zabbix-monitoring-homelab",
    titleEn: "Building a Monitoring Stack with Zabbix in a Homelab",
    titlePt: "Construir um Stack de Monitorização com Zabbix no Homelab",
    date: "2024-11-10",
    readingTime: 10,
    category: "Monitoring",
    tagsEn: ["Zabbix", "Monitoring", "Homelab", "Linux", "Alerting"],
    tagsPt: ["Zabbix", "Monitorização", "Homelab", "Linux", "Alertas"],
    excerptEn:
      "My homelab is my testing ground. Here's how I set up Zabbix to monitor everything — from VMs to network devices — and configured actionable alerts.",
    excerptPt:
      "O meu homelab é o meu terreno de testes. Aqui está como configurei o Zabbix para monitorizar tudo — de VMs a dispositivos de rede — e configurei alertas acionáveis.",
    coverEmoji: "📊",
    contentEn: `## Why Zabbix?

After trying Nagios, Prometheus+Grafana, and LibreNMS, I settled on Zabbix for my homelab because:

- **All-in-one**: monitoring + alerting + dashboards
- **Agent-based and agentless**: works with Linux, Windows, SNMP devices
- **Active community** and solid documentation
- **Free and open source**

## My Homelab Setup

- **Zabbix Server**: Ubuntu 22.04 LTS VM (2 vCPU, 4GB RAM)
- **Database**: PostgreSQL (bundled with Zabbix)
- **Monitored hosts**: 3 VMs (Ubuntu, Windows Server, pfSense), 2 Raspberry Pis, 1 NAS

## Installation (Ubuntu 22.04)

\`\`\`bash
# Add Zabbix repo
wget https://repo.zabbix.com/zabbix/7.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest+ubuntu22.04_all.deb
dpkg -i zabbix-release_latest+ubuntu22.04_all.deb
apt update

# Install server, frontend, agent
apt install -y zabbix-server-pgsql zabbix-frontend-php php8.1-pgsql zabbix-nginx-conf zabbix-sql-scripts zabbix-agent

# Init database
sudo -u postgres createuser --pwprompt zabbix
sudo -u postgres createdb -O zabbix zabbix
zcat /usr/share/zabbix-sql-scripts/postgresql/server.sql.gz | sudo -u zabbix psql zabbix

# Start services
systemctl enable --now zabbix-server zabbix-agent nginx php8.1-fpm
\`\`\`

## Key Templates I Use

Zabbix templates save enormous time. I use these out-of-the-box:

- **Linux by Zabbix agent** — CPU, RAM, disk, network
- **Windows by Zabbix agent** — All standard metrics + event log monitoring
- **pfSense by SNMP** — Interface traffic, state table, uptime
- **TrueNAS by SNMP** — Pool health, disk temps, used space

## Custom Alerting Rules

I configured these triggers on every host:

| Trigger | Severity | Threshold |
|---------|----------|-----------|
| CPU High | Warning | >85% for 5min |
| CPU Critical | High | >95% for 2min |
| RAM Low | Warning | <20% free |
| Disk Low | High | <10% free |
| Host Down | Disaster | No ping for 3min |

## Notifications

I configured Zabbix to send alerts to a Discord channel via webhook:

1. Create a Discord webhook in your server settings
2. In Zabbix: **Administration → Media types → Discord**
3. Add the webhook URL
4. Set up a user media linking the trigger to the Discord channel

## Dashboard I'm Proud Of

My main dashboard shows:
- Network map with host status (green/red dots)
- Graphs for CPU and RAM of all VMs
- Recent problems list
- SNMP interface traffic for the router

## What I Learnt

Setting this up taught me how to think like an operator — anticipating problems before users notice them. That mindset translates directly to production environments.`,
    contentPt: `## Porquê o Zabbix?

Depois de experimentar Nagios, Prometheus+Grafana e LibreNMS, escolhi o Zabbix para o meu homelab porque:

- **Tudo-em-um**: monitorização + alertas + dashboards
- **Com agente e sem agente**: funciona com Linux, Windows, dispositivos SNMP
- **Comunidade ativa** e documentação sólida
- **Gratuito e open source**

## O Meu Setup de Homelab

- **Servidor Zabbix**: VM Ubuntu 22.04 LTS (2 vCPU, 4GB RAM)
- **Base de dados**: PostgreSQL (incluído com Zabbix)
- **Hosts monitorizados**: 3 VMs (Ubuntu, Windows Server, pfSense), 2 Raspberry Pis, 1 NAS

## Instalação (Ubuntu 22.04)

\`\`\`bash
# Adicionar repositório Zabbix
wget https://repo.zabbix.com/zabbix/7.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest+ubuntu22.04_all.deb
dpkg -i zabbix-release_latest+ubuntu22.04_all.deb
apt update

# Instalar servidor, frontend, agente
apt install -y zabbix-server-pgsql zabbix-frontend-php php8.1-pgsql zabbix-nginx-conf zabbix-sql-scripts zabbix-agent

# Inicializar base de dados
sudo -u postgres createuser --pwprompt zabbix
sudo -u postgres createdb -O zabbix zabbix
zcat /usr/share/zabbix-sql-scripts/postgresql/server.sql.gz | sudo -u zabbix psql zabbix

# Iniciar serviços
systemctl enable --now zabbix-server zabbix-agent nginx php8.1-fpm
\`\`\`

## Templates Principais que Uso

Os templates do Zabbix poupam imenso tempo. Uso estes prontos a usar:

- **Linux by Zabbix agent** — CPU, RAM, disco, rede
- **Windows by Zabbix agent** — Todas as métricas padrão + monitorização do event log
- **pfSense by SNMP** — Tráfego de interfaces, tabela de estados, uptime
- **TrueNAS by SNMP** — Saúde do pool, temperaturas dos discos, espaço usado

## Regras de Alerta Personalizadas

Configurei estes triggers em todos os hosts:

| Trigger | Gravidade | Limiar |
|---------|-----------|--------|
| CPU Alto | Aviso | >85% durante 5min |
| CPU Crítico | Alto | >95% durante 2min |
| RAM Baixa | Aviso | <20% livre |
| Disco Baixo | Alto | <10% livre |
| Host Offline | Desastre | Sem ping durante 3min |

## Notificações

Configurei o Zabbix para enviar alertas para um canal Discord via webhook:

1. Criar um webhook Discord nas definições do teu servidor
2. No Zabbix: **Administration → Media types → Discord**
3. Adicionar o URL do webhook
4. Configurar um media de utilizador ligando o trigger ao canal Discord

## Dashboard de que me Orgulho

O meu dashboard principal mostra:
- Mapa de rede com estado dos hosts (pontos verdes/vermelhos)
- Gráficos de CPU e RAM de todas as VMs
- Lista de problemas recentes
- Tráfego de interfaces SNMP do router

## O que Aprendi

Configurar isto ensinou-me a pensar como um operador — a antecipar problemas antes de os utilizadores os notarem. Essa mentalidade traduz-se diretamente para ambientes de produção.`,
  },
  {
    slug: "powershell-automation-tips",
    titleEn: "5 PowerShell Automation Scripts I Use Every Week",
    titlePt: "5 Scripts de Automação PowerShell que Uso Todas as Semanas",
    date: "2024-09-03",
    readingTime: 6,
    category: "Automation",
    tagsEn: ["PowerShell", "Automation", "Windows", "Sysadmin", "Scripting"],
    tagsPt: ["PowerShell", "Automação", "Windows", "Sysadmin", "Scripting"],
    excerptEn:
      "Automation is the sysadmin's best friend. These are the five PowerShell scripts I rely on every week to save hours of repetitive work.",
    excerptPt:
      "A automação é o melhor amigo do sysadmin. Estes são os cinco scripts PowerShell em que confio todas as semanas para poupar horas de trabalho repetitivo.",
    coverEmoji: "⚡",
    contentEn: `## Why Automate?

Every repeated task is an opportunity for human error. PowerShell lets me codify the right way to do things, run it consistently, and audit what happened. Here are my five most-used scripts.

## 1. Bulk User Account Creation from CSV

\`\`\`powershell
Import-Csv "users.csv" | ForEach-Object {
    $password = ConvertTo-SecureString "Welcome123!" -AsPlainText -Force
    New-ADUser \`
        -Name "$($_.FirstName) $($_.LastName)" \`
        -GivenName $_.FirstName \`
        -Surname $_.LastName \`
        -SamAccountName $_.Username \`
        -UserPrincipalName "$($_.Username)@domain.local" \`
        -Department $_.Department \`
        -AccountPassword $password \`
        -ChangePasswordAtLogon $true \`
        -Enabled $true
    Write-Host "Created: $($_.Username)"
}
\`\`\`

## 2. Disk Space Report — All Servers

\`\`\`powershell
$servers = Get-ADComputer -Filter {OperatingSystem -like "*Server*"} | Select-Object -ExpandProperty Name

$report = foreach ($server in $servers) {
    Get-WmiObject Win32_LogicalDisk -ComputerName $server -Filter "DriveType=3" |
    Select-Object \`
        @{N="Server";E={$server}}, \`
        DeviceID, \`
        @{N="Size(GB)";E={[math]::Round($_.Size/1GB,1)}}, \`
        @{N="Free(GB)";E={[math]::Round($_.FreeSpace/1GB,1)}}, \`
        @{N="Used%";E={[math]::Round((($_.Size-$_.FreeSpace)/$_.Size)*100,1)}}
}

$report | Export-Csv "DiskReport_$(Get-Date -f yyyyMMdd).csv" -NoTypeInformation
\`\`\`

## 3. Disable Inactive User Accounts

\`\`\`powershell
$cutoff = (Get-Date).AddDays(-90)
$inactive = Get-ADUser -Filter {
    LastLogonDate -lt $cutoff -and Enabled -eq $true -and
    DistinguishedName -notlike "*OU=ServiceAccounts*"
} -Properties LastLogonDate

foreach ($user in $inactive) {
    Disable-ADAccount $user
    Move-ADObject $user -TargetPath "OU=Disabled,DC=domain,DC=local"
    Write-Host "Disabled and moved: $($user.SamAccountName)"
}
\`\`\`

## 4. Software Inventory across Workstations

\`\`\`powershell
$computers = Get-ADComputer -Filter {Enabled -eq $true} | Select-Object -ExpandProperty Name

$inventory = foreach ($pc in $computers) {
    try {
        Get-WmiObject -Class Win32_Product -ComputerName $pc -ErrorAction Stop |
        Select-Object @{N="Computer";E={$pc}}, Name, Version, Vendor
    } catch {
        Write-Warning "Could not reach $pc"
    }
}

$inventory | Export-Csv "SoftwareInventory.csv" -NoTypeInformation
\`\`\`

## 5. SSL Certificate Expiry Check

\`\`\`powershell
$sites = @("domain.com","mail.domain.com","vpn.domain.com")

foreach ($site in $sites) {
    $req = [System.Net.HttpWebRequest]::Create("https://$site")
    $req.ServerCertificateValidationCallback = {$true}
    try {
        $req.GetResponse() | Out-Null
        $cert = $req.ServicePoint.Certificate
        $expiry = [datetime]$cert.GetExpirationDateString()
        $daysLeft = ($expiry - (Get-Date)).Days
        if ($daysLeft -lt 30) {
            Write-Warning "$site certificate expires in $daysLeft days!"
        } else {
            Write-Host "$site OK — $daysLeft days remaining" -ForegroundColor Green
        }
    } catch { Write-Warning "Could not reach $site" }
}
\`\`\`

## Final Thoughts

These scripts aren't magic — they're written once, tested, and then trusted. Save them to a shared scripts folder with version control (even a simple Git repo) so your team can use them too.`,
    contentPt: `## Porquê Automatizar?

Cada tarefa repetida é uma oportunidade para erro humano. O PowerShell permite-me codificar a forma correta de fazer as coisas, executá-las consistentemente e auditar o que aconteceu. Aqui estão os meus cinco scripts mais usados.

## 1. Criação em Massa de Contas de Utilizador a partir de CSV

\`\`\`powershell
Import-Csv "utilizadores.csv" | ForEach-Object {
    $password = ConvertTo-SecureString "Welcome123!" -AsPlainText -Force
    New-ADUser \`
        -Name "$($_.PrimeiroNome) $($_.Apelido)" \`
        -GivenName $_.PrimeiroNome \`
        -Surname $_.Apelido \`
        -SamAccountName $_.Username \`
        -UserPrincipalName "$($_.Username)@dominio.local" \`
        -Department $_.Departamento \`
        -AccountPassword $password \`
        -ChangePasswordAtLogon $true \`
        -Enabled $true
    Write-Host "Criado: $($_.Username)"
}
\`\`\`

## 2. Relatório de Espaço em Disco — Todos os Servidores

\`\`\`powershell
$servidores = Get-ADComputer -Filter {OperatingSystem -like "*Server*"} | Select-Object -ExpandProperty Name

$relatorio = foreach ($servidor in $servidores) {
    Get-WmiObject Win32_LogicalDisk -ComputerName $servidor -Filter "DriveType=3" |
    Select-Object \`
        @{N="Servidor";E={$servidor}}, \`
        DeviceID, \`
        @{N="Tamanho(GB)";E={[math]::Round($_.Size/1GB,1)}}, \`
        @{N="Livre(GB)";E={[math]::Round($_.FreeSpace/1GB,1)}}, \`
        @{N="Usado%";E={[math]::Round((($_.Size-$_.FreeSpace)/$_.Size)*100,1)}}
}

$relatorio | Export-Csv "RelatorioDisco_$(Get-Date -f yyyyMMdd).csv" -NoTypeInformation
\`\`\`

## 3. Desativar Contas de Utilizador Inativas

\`\`\`powershell
$limite = (Get-Date).AddDays(-90)
$inativos = Get-ADUser -Filter {
    LastLogonDate -lt $limite -and Enabled -eq $true -and
    DistinguishedName -notlike "*OU=ContasServico*"
} -Properties LastLogonDate

foreach ($utilizador in $inativos) {
    Disable-ADAccount $utilizador
    Move-ADObject $utilizador -TargetPath "OU=Desativados,DC=dominio,DC=local"
    Write-Host "Desativado e movido: $($utilizador.SamAccountName)"
}
\`\`\`

## 4. Inventário de Software em Workstations

\`\`\`powershell
$computadores = Get-ADComputer -Filter {Enabled -eq $true} | Select-Object -ExpandProperty Name

$inventario = foreach ($pc in $computadores) {
    try {
        Get-WmiObject -Class Win32_Product -ComputerName $pc -ErrorAction Stop |
        Select-Object @{N="Computador";E={$pc}}, Name, Version, Vendor
    } catch {
        Write-Warning "Não foi possível alcançar $pc"
    }
}

$inventario | Export-Csv "InventarioSoftware.csv" -NoTypeInformation
\`\`\`

## 5. Verificação de Expiração de Certificados SSL

\`\`\`powershell
$sites = @("dominio.pt","mail.dominio.pt","vpn.dominio.pt")

foreach ($site in $sites) {
    $req = [System.Net.HttpWebRequest]::Create("https://$site")
    $req.ServerCertificateValidationCallback = {$true}
    try {
        $req.GetResponse() | Out-Null
        $cert = $req.ServicePoint.Certificate
        $expiry = [datetime]$cert.GetExpirationDateString()
        $diasRestantes = ($expiry - (Get-Date)).Days
        if ($diasRestantes -lt 30) {
            Write-Warning "Certificado de $site expira em $diasRestantes dias!"
        } else {
            Write-Host "$site OK — $diasRestantes dias restantes" -ForegroundColor Green
        }
    } catch { Write-Warning "Não foi possível alcançar $site" }
}
\`\`\`

## Considerações Finais

Estes scripts não são magia — são escritos uma vez, testados e depois de confiança. Guarda-os numa pasta de scripts partilhada com controlo de versões (mesmo um simples repositório Git) para que a tua equipa também os possa usar.`,
  },
  {
    slug: "ccna-study-guide",
    titleEn: "How I Passed the CCNA: My Study Strategy and Resources",
    titlePt: "Como Passei no CCNA: A Minha Estratégia de Estudo e Recursos",
    date: "2024-07-20",
    readingTime: 8,
    category: "Certifications",
    tagsEn: ["CCNA", "Cisco", "Certification", "Networking", "Study"],
    tagsPt: ["CCNA", "Cisco", "Certificação", "Redes", "Estudo"],
    excerptEn:
      "The CCNA is a challenging but rewarding certification. Here's the exact strategy, resources, and timeline I used to pass it while working full-time.",
    excerptPt:
      "O CCNA é uma certificação desafiante mas gratificante. Aqui está a estratégia exata, os recursos e o cronograma que usei para o passar enquanto trabalhava a tempo inteiro.",
    coverEmoji: "🎓",
    contentEn: `## My Background

I started studying for the CCNA while working as a helpdesk technician. I had basic networking knowledge (TCP/IP, subnetting), but no formal Cisco training. It took me 4 months studying roughly 10 hours per week.

## My Study Plan

### Month 1–2: Foundation

- **Primary resource**: Jeremy's IT Labs (YouTube) — the best free CCNA resource period.
- **Anki flashcards**: I made cards for every command, every concept.
- **Lab tool**: Cisco Packet Tracer (free with a Cisco NetAcad account).

### Month 3: Deep Dive

Focus areas in month 3:
- **Routing**: OSPF, EIGRP, BGP basics, route redistribution
- **Switching**: STP, VLANs, EtherChannel, inter-VLAN routing
- **Security**: ACLs, NAT, port security, DHCP snooping

\`\`\`cisco
! Sample OSPF config I practiced
router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/1
\`\`\`

### Month 4: Practice Exams

- **Boson ExSim-Max** — the closest to the real exam format.
- Target: consistently scoring 85%+ before booking.
- Review every wrong answer without exception.

## Key Topics by Weight

| Domain | Weight |
|--------|--------|
| Network Fundamentals | 20% |
| Network Access | 20% |
| IP Connectivity | 25% |
| IP Services | 10% |
| Security Fundamentals | 15% |
| Automation & Programmability | 10% |

## Subnetting — The One Skill You Must Master

I spent 2 weeks just on subnetting until I could do it in my head. Given an IP and mask, I need to find:
- Network address
- Broadcast address
- Usable host range
- Number of hosts

Practice tool: [subnettingpractice.com](https://subnettingpractice.com) — 15 minutes every day for a month.

## Exam Day Tips

1. **Read questions twice** — Cisco questions are deliberately ambiguous.
2. **Flag and move on** — don't spend 10 minutes on one question.
3. **Drag-and-drop questions** — these appear and can feel unfamiliar. Stay calm.
4. **Sim questions** — read them carefully, they test exact configuration.

## Was It Worth It?

Absolutely. The CCNA gave me the structured networking knowledge that turned me from someone who "knew networking" into someone who *understood* networking. I landed my current network technician role directly because of it.

The path is clear: Jeremy's IT Labs → Packet Tracer → Boson practice exams → sit the exam.`,
    contentPt: `## A Minha Experiência Prévia

Comecei a estudar para o CCNA enquanto trabalhava como técnico de helpdesk. Tinha conhecimentos básicos de redes (TCP/IP, subnetting), mas sem formação formal em Cisco. Demorei 4 meses a estudar cerca de 10 horas por semana.

## O Meu Plano de Estudo

### Meses 1–2: Base

- **Recurso principal**: Jeremy's IT Labs (YouTube) — o melhor recurso gratuito para CCNA, ponto final.
- **Flashcards Anki**: Criei cards para cada comando e cada conceito.
- **Ferramenta de laboratório**: Cisco Packet Tracer (gratuito com uma conta Cisco NetAcad).

### Mês 3: Aprofundamento

Áreas de foco no mês 3:
- **Routing**: OSPF, EIGRP, bases de BGP, redistribuição de rotas
- **Switching**: STP, VLANs, EtherChannel, inter-VLAN routing
- **Segurança**: ACLs, NAT, port security, DHCP snooping

\`\`\`cisco
! Configuração OSPF de exemplo que pratiquei
router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/1
\`\`\`

### Mês 4: Exames de Prática

- **Boson ExSim-Max** — o mais próximo do formato real do exame.
- Objetivo: pontuar consistentemente acima de 85% antes de marcar o exame.
- Rever cada resposta errada sem exceção.

## Tópicos Principais por Peso

| Domínio | Peso |
|---------|------|
| Fundamentos de Rede | 20% |
| Acesso à Rede | 20% |
| Conectividade IP | 25% |
| Serviços IP | 10% |
| Fundamentos de Segurança | 15% |
| Automação e Programabilidade | 10% |

## Subnetting — A Competência que Tens de Dominar

Passei 2 semanas apenas em subnetting até o conseguir fazer mentalmente. Dado um IP e máscara, preciso de encontrar:
- Endereço de rede
- Endereço de broadcast
- Intervalo de hosts utilizáveis
- Número de hosts

Ferramenta de prática: [subnettingpractice.com](https://subnettingpractice.com) — 15 minutos todos os dias durante um mês.

## Dicas para o Dia do Exame

1. **Lê as perguntas duas vezes** — as perguntas Cisco são deliberadamente ambíguas.
2. **Marca e avança** — não passes 10 minutos numa única pergunta.
3. **Perguntas de arrastar e largar** — aparecem e podem parecer pouco familiares. Mantém a calma.
4. **Perguntas de simulação** — lê-as com atenção, testam configuração exata.

## Valeu a Pena?

Absolutamente. O CCNA deu-me o conhecimento estruturado de redes que me transformou de alguém que "sabia de redes" para alguém que *compreendia* redes. Consegui o meu atual cargo de técnico de redes diretamente por causa dele.

O caminho é claro: Jeremy's IT Labs → Packet Tracer → Exames de prática Boson → sentar o exame.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string, lang: "en" | "pt"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
